const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logger } = require('./logger');

const protect = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET missing');
    }

    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith('Bearer ')) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2) {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Please log in.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id)
      .select('_id role email isActive')
      .lean();

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive.',
      });
    }

    req.user = user;

    next();
  } catch (err) {
    logger.warn({
      message: 'Auth error',
      error: err.message,
      stack: err.stack,
    });

    const msg =
      err.name === 'TokenExpiredError'
        ? 'Session expired. Please log in again.'
        : 'Invalid token.';

    res.status(401).json({ success: false, message: msg });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.',
    });
  }

  next();
};

module.exports = { protect, adminOnly };