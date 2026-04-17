const express = require('express');
const router = express.Router();

const vaccinationController = require('../controllers/temp');

const { globalLimiter } = require('../middleware/rateLimit');

/* ================= MIDDLEWARE ================= */

router.use(globalLimiter);

/* ================= ROUTES ================= */

router.get('/centres', vaccinationController.getCentres);

router.get('/schedule', vaccinationController.getSchedule);

router.post('/reminder', vaccinationController.createReminder);

module.exports = router;