const { validationResult } = require('express-validator');
const { fail } = require('../utils/response');

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return fail(res, 400, 'Validation failed', errors.array());
  }
  next();
}

module.exports = { validateRequest };
