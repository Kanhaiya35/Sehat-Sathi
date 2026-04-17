const User = require('../models/User');
const ChatHistory = require('../models/ChatHistory');
const OutbreakAlert = require('../models/OutbreakAlert');
const { logger } = require('../middleware/logger');

/* ================= HELPERS ================= */

const escapeRegex = (text) =>
  text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* ================= STATS ================= */

exports.getStats = async (req, res, next) => {
  try {
    const [totalUsers, totalChats, activeAlerts, recentUsers, msgAgg] = await Promise.all([
      User.countDocuments(),
      ChatHistory.countDocuments(),
      OutbreakAlert.countDocuments({
        isActive: true,
        expiresAt: { $gt: new Date() }
      }),

      User.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email createdAt role preferredLanguage')
        .lean(),

      ChatHistory.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$queryCount' }
          }
        }
      ])
    ]);

    const langAgg = await User.aggregate([
      { $group: { _id: '$preferredLanguage', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalChats,
        activeAlerts,
        totalMessages: msgAgg[0]?.total || 0,
        recentUsers,
        languageDistribution: langAgg
      }
    });

  } catch (err) {
    next(err);
  }
};

/* ================= USERS ================= */

exports.getUsers = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;

    const search = req.query.search
      ? {
          $or: [
            { name: new RegExp(escapeRegex(req.query.search), 'i') },
            { email: new RegExp(escapeRegex(req.query.search), 'i') }
          ]
        }
      : {};

    const [users, total] = await Promise.all([
      User.find(search)
        .select('name email role createdAt preferredLanguage isActive')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      User.countDocuments(search)
    ]);

    res.json({
      success: true,
      users,
      total,
      page,
      pages: Math.ceil(total / limit)
    });

  } catch (err) {
    next(err);
  }
};

/* ================= TOP QUERIES ================= */

exports.getTopQueries = async (req, res, next) => {
  try {
    const sessions = await ChatHistory.find()
      .sort({ queryCount: -1 })
      .limit(10)
      .populate('userId', 'name email')
      .select('sessionId queryCount provider language createdAt userId')
      .lean();

    res.json({ success: true, sessions });

  } catch (err) {
    next(err);
  }
};

/* ================= UPDATE ROLE ================= */

exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role.'
      });
    }

    if (req.user._id.toString() === req.params.id && role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'You cannot remove your own admin role.'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('name email role isActive').lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    logger.info(`Admin ${req.user.email} updated role for user ${req.params.id}`);

    res.json({ success: true, user });

  } catch (err) {
    next(err);
  }
};

/* ================= TOGGLE STATUS ================= */

exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    user.isActive = !user.isActive;
    await user.save({ validateBeforeSave: false });

    logger.info(`Admin ${req.user.email} changed status for user ${req.params.id}`);

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'}.`
    });

  } catch (err) {
    next(err);
  }
};

/* ================= ALERTS ================= */

exports.getAlerts = async (req, res, next) => {
  try {
    const alerts = await OutbreakAlert.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('createdBy', 'name')
      .lean();

    res.json({ success: true, alerts });

  } catch (err) {
    next(err);
  }
};

exports.createAlert = async (req, res, next) => {
  try {
    const alert = await OutbreakAlert.create({
      ...req.body,
      createdBy: req.user._id
    });

    logger.info(`Admin ${req.user.email} created alert`);

    res.status(201).json({ success: true, alert });

  } catch (err) {
    next(err);
  }
};

exports.deactivateAlert = async (req, res, next) => {
  try {
    const alert = await OutbreakAlert.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    ).lean();

    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert not found.'
      });
    }

    logger.info(`Admin ${req.user.email} deactivated alert ${req.params.id}`);

    res.json({ success: true, alert });

  } catch (err) {
    next(err);
  }
};