require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const sanitizeInput = require('./middleware/sanitize');
const errorHandler = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/logger');
const { globalLimiter } = require('./middleware/rateLimit');

/* ================= ROUTES ================= */

const authRoutes = require('./routes/authRoutes');
const outbreakRoutes = require('./routes/outbreakRoutes');
const chatRoutes = require('./routes/chatRoutes');
const alertRoutes = require('./routes/alertRoutes'); // optional if used
const adminRoutes = require('./routes/adminRoutes'); // optional if used
const vaccinationRoutes = require('./routes/vaccinationRoutes'); // optional

/* ================= APP ================= */

const app = express();

/* ================= CORE ================= */

app.set('trust proxy', 1);
connectDB();

/* ================= MIDDLEWARE ================= */

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],

        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.tailwindcss.com",
          "https://maps.googleapis.com",
          "https://maps.gstatic.com"
        ],

        scriptSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.tailwindcss.com",
          "https://maps.googleapis.com",
          "https://maps.gstatic.com"
        ],

        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com"
        ],

        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],

        imgSrc: [
          "'self'",
          "data:",
          "https:",
          "https://maps.googleapis.com",
          "https://maps.gstatic.com"
        ],

        connectSrc: [
          "'self'",
          "http://localhost:5000",
          "https://maps.googleapis.com"
        ],

        frameSrc: [
          "https://maps.googleapis.com"
        ]
      }
    }
  })
);

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5000",
  credentials: true
}));

app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(sanitizeInput);

app.use(globalLimiter);
app.use(requestLogger);

/* ================= STATIC ================= */

const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

/* ================= ROUTES ================= */

app.use('/api/auth', authRoutes);
app.use('/api/outbreaks', outbreakRoutes);
app.use('/api/chat', chatRoutes);

/* OPTIONAL ROUTES */
app.use('/api/alerts', alertRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vaccination', vaccinationRoutes);

/* ================= TEST ================= */

app.get("/test-ai", async (req, res, next) => {
  try {
    const { getAIResponse } = require("./services/aiProvider");

    const reply = await getAIResponse(
      "hello",
      [],
      "You are helpful",
      "gemini"
    );

    res.json({ success: true, reply });

  } catch (err) {
    next(err);
  }
});

/* ================= FRONTEND FALLBACK ================= */

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

/* ================= ERROR ================= */

app.use(errorHandler);

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});