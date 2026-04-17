const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit'); // 🔥 IMPORTANT

const make = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,

    // 🔥 FIX for IPv6 issue
    keyGenerator: (req) => ipKeyGenerator(req),

    message: {
      success: false,
      message
    }
  });

const globalLimiter = make(
  15 * 60 * 1000,
  150,
  'Too many requests. Try again later.'
);

const authLimiter = make(
  30 * 60 * 1000,
  10,
  'Too many login attempts. Wait 30 minutes.'
);

const chatLimiter = make(
  60 * 1000,
  25,
  'Too many messages. Slow down.'
);

module.exports = {
  globalLimiter,
  authLimiter,
  chatLimiter
};