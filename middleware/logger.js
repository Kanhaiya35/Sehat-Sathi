const winston = require('winston');
const morgan  = require('morgan');

const fmt = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
  format: fmt,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, stack }) =>
          stack
            ? `${timestamp} ${level}: ${message}\n${stack}`
            : `${timestamp} ${level}: ${message}`
        )
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log',    level: 'error', maxsize: 5_242_880, maxFiles: 5 }),
    new winston.transports.File({ filename: 'logs/combined.log',               maxsize: 5_242_880, maxFiles: 5 }),
  ],
});

const morganStream = { write: (msg) => logger.http(msg.trim()) };

const requestLogger = morgan(
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  { stream: morganStream }
);

module.exports = { logger, requestLogger };