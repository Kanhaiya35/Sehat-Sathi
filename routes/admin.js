const express = require('express');
const router  = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const User         = require('../models/User');
const ChatHistory  = require('../models/ChatHistory');
const OutbreakAlert = require('../models/OutbreakAlert');
const { validate, schemas } = require('../middleware/validate');

router.use(protect, adminOnly);

// GET /api/admin/stats
router.get('/stats', async (req, res, next) => {
  try {
    const [totalUsers, totalChats, activeAlerts, recentUsers, msgAgg] = await Promise.all([
      User.countDocuments(),
      ChatHistory.countDocuments(),
      OutbreakAlert.countDocuments({ isActive: true, expiresAt: { $gt: new Date() } }),
      User.find().sort({ createdAt: -1 }).limit(5).select('name email createdAt role preferredLanguage'),
      ChatHistory.aggregate([
        { $project: { cnt: { $size: '$messages' } } },
        { $group: { _id: null, total: { $sum: '$cnt' } } },
      ]),
    ]);
    const langAgg = await User.aggregate([
      { $group: { _id: '$preferredLanguage', count: { $sum: 1 } } },
    ]);
    res.json({
      success: true,
      stats: {
        totalUsers, totalChats, activeAlerts,
        totalMessages: msgAgg[0]?.total || 0,
        recentUsers,
        languageDistribution: langAgg,
      },
    });
  } catch (err) { next(err); }
});

// GET /api/admin/users
router.get('/users', async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;
    const search = req.query.search
      ? { $or: [{ name: new RegExp(req.query.search,'i') }, { email: new RegExp(req.query.search,'i') }] }
      : {};

    const [users, total] = await Promise.all([
      User.find(search).sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments(search),
    ]);
    res.json({ success: true, users, total, page, pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
});

// GET /api/admin/top-queries
router.get('/top-queries', async (req, res, next) => {
  try {
    const sessions = await ChatHistory.find()
      .sort({ queryCount: -1 }).limit(10)
      .populate('userId', 'name email')
      .select('sessionId queryCount provider language createdAt userId');
    res.json({ success: true, sessions });
  } catch (err) { next(err); }
});

// PATCH /api/admin/users/:id/role
router.patch('/users/:id/role', async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['user','admin'].includes(role))
      return res.status(400).json({ success: false, message: 'Invalid role.' });
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    res.json({ success: true, user });
  } catch (err) { next(err); }
});

// PATCH /api/admin/users/:id/status
router.patch('/users/:id/status', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    user.isActive = !user.isActive;
    await user.save({ validateBeforeSave: false });
    res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}.` });
  } catch (err) { next(err); }
});

// GET /api/admin/alerts
router.get('/alerts', async (req, res, next) => {
  try {
    const alerts = await OutbreakAlert.find()
      .sort({ createdAt: -1 }).populate('createdBy', 'name');
    res.json({ success: true, alerts });
  } catch (err) { next(err); }
});

// POST /api/admin/alerts
router.post('/alerts', validate(schemas.alert), async (req, res, next) => {
  try {
    const alert = await OutbreakAlert.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json({ success: true, alert });
  } catch (err) { next(err); }
});

// PATCH /api/admin/alerts/:id/deactivate
router.patch('/alerts/:id/deactivate', async (req, res, next) => {
  try {
    const alert = await OutbreakAlert.findByIdAndUpdate(
      req.params.id, { isActive: false }, { new: true }
    );
    if (!alert) return res.status(404).json({ success: false, message: 'Alert not found.' });
    res.json({ success: true, alert });
  } catch (err) { next(err); }
});

module.exports = router;