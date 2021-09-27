const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500,
  [errors.EXTERNAL_API_ERROR]: 503,
  [errors.NOT_FOUND_ERROR]: 404,
  [errors.VALIDATION_ERROR]: 400,
  [errors.ENCRYPTION_ERROR]: 500,
  [errors.INTERNAL_ERROR]: 500,
  [errors.NOT_FOUND_ERROR]: 404,
  [errors.AUTHENTICATION_ERROR]: 401,
  [errors.AUTHORIZATION_ERROR]: 401
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
