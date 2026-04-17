const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimit');

/* ================= ROUTES ================= */

router.post('/register',
  validate(schemas.register),
  authController.register
);

router.post('/login',
  authLimiter,
  validate(schemas.login),
  authController.login
);

router.post('/logout', authController.logout);

router.get('/me',
  protect,
  authController.getMe
);

router.put('/language',
  protect,
  authController.updateLanguage
);

module.exports = router;