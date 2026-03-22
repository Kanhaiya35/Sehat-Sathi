const { logger } = require('./logger');

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message = 'Internal server error' } = err;

  if (err.name === 'CastError')       { statusCode = 400; message = 'Invalid resource ID.'; }
  if (err.name === 'ValidationError') { statusCode = 400; message = Object.values(err.errors).map(e => e.message).join(', '); }
  if (err.code === 11000)             { statusCode = 409; message = `${Object.keys(err.keyValue)[0]} already exists.`; }
  if (err.name === 'JsonWebTokenError') { statusCode = 401; message = 'Invalid token.'; }
  if (err.name === 'TokenExpiredError') { statusCode = 401; message = 'Session expired.'; }

  logger.error(`${statusCode} ${message} | ${req.method} ${req.originalUrl} | IP:${req.ip}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;