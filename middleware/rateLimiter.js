const rateLimit = require('express-rate-limit');

const make = (windowMs, max, message) => rateLimit({
  windowMs, max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message },
});

const globalLimiter = make(
  15 * 60 * 1000, 150,
  'Too many requests. Please try again after 15 minutes.'
);

const authLimiter = make(
  30 * 60 * 1000, 10,
  'Too many login attempts. Please wait 30 minutes.'
);

const chatLimiter = make(
  60 * 1000, 25,
  'Chat rate limit exceeded. Please wait a moment.'
);

module.exports = { globalLimiter, authLimiter, chatLimiter };