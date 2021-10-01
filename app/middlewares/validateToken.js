const jwt = require('jwt-simple');
const { authorizationError, authenticationError } = require('../errors');
const { authorizationErrorMessage, authenticationErrorMessage } = require('../helpers/constants');
const config = require('../../config');
const logger = require('../logger');

const { secret } = config.common.token;

exports.validateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw authenticationError(authenticationErrorMessage);
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, secret);
    req.user = {
      id: decoded.payload.id,
      email: decoded.payload.email,
      isAdmin: decoded.payload.isAdmin
    };
    next();
  } catch (error) {
    logger.error(error.message);
    next(authorizationError(authorizationErrorMessage));
  }
};
