function success(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
}

function fail(res, statusCode, message, data = null) {
  return res.status(statusCode).json({
    status: 'error',
    message,
    data,
  });
}

module.exports = { success, fail };
