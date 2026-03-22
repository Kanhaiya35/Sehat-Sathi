const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');

const { protect } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimiter');

/* ================= TOKEN GENERATOR ================= */

const sendToken = (user, statusCode, res) => {

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const expiresMs =
    parseInt(process.env.JWT_COOKIE_EXPIRES || '7') *
    24 * 60 * 60 * 1000;

  res.cookie('token', token, {
    expires: new Date(Date.now() + expiresMs),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};


/* ================= REGISTER ================= */

router.post(
  '/register',
  async (req, res, next) => {

    try {

      const { name, email, password, phone, language } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered.'
        });
      }

      const user = await User.create({
        name,
        email,
        password,
        phone,
        preferredLanguage: language || 'en'
      });

      sendToken(user, 201, res);

    } catch (err) {
      next(err);
    }

  }
);


/* ================= LOGIN ================= */

router.post(
  '/login',
  authLimiter,
  validate(schemas.login),
  async (req, res, next) => {

    try {

      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.'
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Account deactivated. Contact support.'
        });
      }

      user.lastLogin = new Date();
      user.loginCount += 1;

      await user.save({ validateBeforeSave: false });

      sendToken(user, 200, res);

    } catch (err) {
      next(err);
    }

  }
);


/* ================= LOGOUT ================= */

router.post('/logout', (req, res) => {

  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 5000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.json({
    success: true,
    message: 'Logged out.'
  });

});


/* ================= CURRENT USER ================= */

router.get('/me', protect, (req, res) => {

  res.json({
    success: true,
    user: req.user
  });

});


/* ================= UPDATE LANGUAGE ================= */

router.put('/language', protect, async (req, res, next) => {

  try {

    const { language } = req.body;

    if (!['en','hi','mr','ta','bn'].includes(language)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid language code.'
      });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      { preferredLanguage: language }
    );

    res.json({
      success: true,
      message: 'Language preference updated.'
    });

  } catch (err) {
    next(err);
  }

});


module.exports = router;