const mongoose = require('mongoose');
const { logger } = require('../middleware/logger');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // 🔥 connection pool
    });

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);

    /* ================= CONNECTION EVENTS ================= */

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    /* ================= GRACEFUL SHUTDOWN ================= */

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.warn('MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (err) {
    logger.error(`❌ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;