const express      = require('express');
const router       = express.Router();
const { v4: uuid } = require('uuid');
const { protect }            = require('../middleware/auth');
const { validate, schemas }  = require('../middleware/validate');
const { chatLimiter }        = require('../middleware/rateLimiter');
const ChatHistory             = require('../models/ChatHistory');
const { getAIResponse }       = require('../utils/aiProvider');

const SYSTEM_PROMPT = (lang) =>
`You are Sehat Sathi (Health Companion), a caring AI healthcare assistant for rural and semi-urban India.
Your role: provide accurate, easy-to-understand health education about preventive care, disease symptoms, vaccinations, and government health schemes like Ayushman Bharat and PM-JAY.
IMPORTANT rules:
- NEVER diagnose. Always recommend consulting a licensed doctor.
- Keep answers concise and simple (max 3-4 short paragraphs).
- Respond in the user's language: ${lang}.
- If asked about emergencies, provide: 108 (Ambulance), 102 (Mother & Child), 181 (Women), 1098 (Child), 14555 (PM-JAY).
- Be culturally sensitive to Indian rural context.`;

// POST /api/chat/message
router.post('/message', protect, chatLimiter, validate(schemas.chat), async (req, res, next) => {
  try {
    const { message, provider, language, sessionId } = req.body;
    const sid = sessionId || uuid();

    let session = await ChatHistory.findOne({ sessionId: sid, userId: req.user._id });
    if (!session) {
      session = new ChatHistory({ userId: req.user._id, sessionId: sid, provider, language, messages: [] });
    }

    const context = session.messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
    const aiReply = await getAIResponse(message, context, SYSTEM_PROMPT(language), provider);

    session.messages.push({ role: 'user', content: message });
    session.messages.push({ role: 'assistant', content: aiReply });
    session.queryCount += 1;
    session.provider = provider;
    session.language = language;
    await session.save();

    res.json({ success: true, response: aiReply, sessionId: sid });
  } catch (err) { next(err); }
});

// GET /api/chat/history
router.get('/history', protect, async (req, res, next) => {
  try {
    const sessions = await ChatHistory.find({ userId: req.user._id })
      .sort({ updatedAt: -1 }).limit(20)
      .select('sessionId messages updatedAt provider language queryCount');
    res.json({ success: true, sessions });
  } catch (err) { next(err); }
});

// GET /api/chat/session/:sid
router.get('/session/:sid', protect, async (req, res, next) => {
  try {
    const session = await ChatHistory.findOne({ sessionId: req.params.sid, userId: req.user._id });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found.' });
    res.json({ success: true, session });
  } catch (err) { next(err); }
});

// DELETE /api/chat/session/:sid
router.delete('/session/:sid', protect, async (req, res, next) => {
  try {
    await ChatHistory.findOneAndDelete({ sessionId: req.params.sid, userId: req.user._id });
    res.json({ success: true, message: 'Session deleted.' });
  } catch (err) { next(err); }
});

module.exports = router;