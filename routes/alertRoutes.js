const express = require('express');
const router = express.Router();

const alertController = require('../controllers/alertController');

const { globalLimiter } = require('../middleware/rateLimit');

/* ================= MIDDLEWARE ================= */

router.use(globalLimiter);

/* ================= ROUTES ================= */

router.get('/active', alertController.getActiveAlerts);

module.exports = router;