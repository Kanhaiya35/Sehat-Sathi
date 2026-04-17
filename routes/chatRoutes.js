const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chatController');

const { protect } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { chatLimiter } = require('../middleware/rateLimit');

/* ================= ROUTES ================= */

router.post(
  '/message',
  protect,
  chatLimiter,
  validate(schemas.chat),
  chatController.sendMessage
);

router.get(
  '/history',
  protect,
  chatController.getHistory
);

router.get(
  '/session/:sid',
  protect,
  chatController.getSession
);

router.delete(
  '/session/:sid',
  protect,
  chatController.deleteSession
);

module.exports = router;