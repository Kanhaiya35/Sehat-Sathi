const express = require('express');
const router  = express.Router();
const OutbreakAlert = require('../models/OutbreakAlert');

// GET /api/alerts/active  — public
router.get('/active', async (req, res, next) => {
  try {
    const alerts = await OutbreakAlert.find({
      isActive: true,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 }).limit(5).select('title message severity region createdAt');
    res.json({ success: true, alerts });
  } catch (err) { next(err); }
});

module.exports = router;