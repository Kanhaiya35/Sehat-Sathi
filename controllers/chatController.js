const { v4: uuid } = require('uuid');

const ChatHistory = require('../models/ChatHistory');
const { getAIResponse } = require('../services/aiProvider');
const { logger } = require('../middleware/logger');

/* ================= SYSTEM PROMPT ================= */

const SYSTEM_PROMPT = (lang) =>
`You are Sehat Sathi (Health Companion), a caring AI healthcare assistant for rural and semi-urban India.
Your role: provide accurate, easy-to-understand health education about preventive care, disease symptoms, vaccinations, and government health schemes like Ayushman Bharat and PM-JAY.
IMPORTANT rules:
- NEVER diagnose. Always recommend consulting a licensed doctor.
- Keep answers concise (max 3-4 short paragraphs).
- Respond in the user's language: ${lang}.
- If emergency: 108 (Ambulance), 102 (Mother & Child), 181 (Women), 1098 (Child), 14555 (PM-JAY).
- Be culturally sensitive.`;

/* ================= SEND MESSAGE ================= */

exports.sendMessage = async (req, res, next) => {
  try {
    const {
      message,
      provider = 'openai',
      language = 'en',
      sessionId
    } = req.body;

    const sid = sessionId || uuid();

    let session = await ChatHistory.findOne({
      sessionId: sid,
      userId: req.user._id
    });

    if (!session) {
      session = new ChatHistory({
        userId: req.user._id,
        sessionId: sid,
        provider,
        language,
        messages: [],
        queryCount: 0
      });
    }

    const context = session.messages
      .slice(-10)
      .map(m => ({
        role: m.role,
        content: m.content
      }));

    const aiReply = await getAIResponse(
      message,
      context,
      SYSTEM_PROMPT(language),
      provider
    );

    if (session.messages.length > 100) {
      session.messages = session.messages.slice(-80);
    }

    session.messages.push({ role: 'user', content: message });
    session.messages.push({ role: 'assistant', content: aiReply });

    session.queryCount += 1;
    session.provider = provider;
    session.language = language;

    await session.save();

    logger.info(`User ${req.user.email} used chat (${provider})`);

    res.json({
      success: true,
      response: aiReply,
      sessionId: sid
    });

  } catch (err) {
    next(err);
  }
};

/* ================= GET HISTORY ================= */

exports.getHistory = async (req, res, next) => {
  try {
    const sessions = await ChatHistory.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(20)
      .select('sessionId updatedAt provider language queryCount')
      .lean();

    res.json({
      success: true,
      sessions
    });

  } catch (err) {
    next(err);
  }
};

/* ================= GET SESSION ================= */

exports.getSession = async (req, res, next) => {
  try {
    const session = await ChatHistory.findOne({
      sessionId: req.params.sid,
      userId: req.user._id
    }).lean();

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found.'
      });
    }

    res.json({
      success: true,
      session
    });

  } catch (err) {
    next(err);
  }
};

/* ================= DELETE SESSION ================= */

exports.deleteSession = async (req, res, next) => {
  try {
    const result = await ChatHistory.findOneAndDelete({
      sessionId: req.params.sid,
      userId: req.user._id
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Session not found.'
      });
    }

    logger.info(`User ${req.user.email} deleted session ${req.params.sid}`);

    res.json({
      success: true,
      message: 'Session deleted.'
    });

  } catch (err) {
    next(err);
  }
};