const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

const { protect, adminOnly } = require('../middleware/auth');
const { globalLimiter } = require('../middleware/rateLimit');
const { validate, schemas } = require('../middleware/validate');

/* ================= MIDDLEWARE ================= */

router.use(protect, adminOnly, globalLimiter);

/* ================= ROUTES ================= */

router.get('/stats', adminController.getStats);

router.get('/users', adminController.getUsers);

router.get('/top-queries', adminController.getTopQueries);

router.patch('/users/:id/role', adminController.updateUserRole);

router.patch('/users/:id/status', adminController.toggleUserStatus);

router.get('/alerts', adminController.getAlerts);

router.post('/alerts',
  validate(schemas.alert),
  adminController.createAlert
);

router.patch('/alerts/:id/deactivate',
  adminController.deactivateAlert
);

module.exports = router;