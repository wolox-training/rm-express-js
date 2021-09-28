const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EXTERNAL_API_ERROR = 'external_api_error';
exports.externalApiError = message => internalError(message, exports.EXTERNAL_API_ERROR);

exports.NOT_FOUND_ERROR = 'not_found_error';
exports.notFoundError = message => internalError(message, exports.NOT_FOUND_ERROR);

exports.ENCRYPTION_ERROR = 'encryption_error';
exports.encryptionError = message => internalError(message, exports.ENCRYPTION_ERROR);

exports.VALIDATION_ERROR = 'validation_error';
exports.validationError = message => internalError(message, exports.VALIDATION_ERROR);

exports.INTERNAL_ERROR = 'internal_api_error';
exports.internalApiError = message => internalError(message, exports.INTERNAL_ERROR);

exports.NOT_FOUND_ERROR = 'not_found_error';
exports.notFoundError = message => internalError(message, exports.NOT_FOUND_ERROR);

exports.AUTHENTICATION_ERROR = 'authentication_error';
exports.authenticationError = message => internalError(message, exports.AUTHENTICATION_ERROR);

exports.AUTHORIZATION_ERROR = 'authorization_error';
exports.authorizationError = message => internalError(message, exports.AUTHORIZATION_ERROR);

exports.FORBIDDEN_ERROR = 'forbidden_error';
exports.forbiddenError = message => internalError(message, exports.FORBIDDEN_ERROR);
