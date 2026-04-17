const express = require("express");
const router = express.Router();

const outbreakController = require("../controllers/outbreakController");
const { globalLimiter } = require("../middleware/rateLimit");

/* ================= MIDDLEWARE ================= */

router.use(globalLimiter);

/* ================= ROUTES ================= */

router.get("/", outbreakController.getOutbreakNews);

module.exports = router;