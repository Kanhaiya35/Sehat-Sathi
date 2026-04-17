const OutbreakAlert = require('../models/OutbreakAlert');

/* ================= GET ACTIVE ALERTS ================= */

exports.getActiveAlerts = async (req, res, next) => {
  try {
    const alerts = await OutbreakAlert.find({
      isActive: true,
      expiresAt: { $gt: new Date() },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title message severity region createdAt')
      .lean();

    res.json({
      success: true,
      count: alerts.length,
      alerts
    });

  } catch (err) {
    next(err);
  }
};