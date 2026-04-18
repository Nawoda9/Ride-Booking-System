function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';
  console.error('[PS] Error:', message);
  res.status(statusCode).json({
    status: 'error',
    message,
    data: err.details ?? null,
  });
}

module.exports = { errorHandler };
