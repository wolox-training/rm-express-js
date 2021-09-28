const jwt = require('jwt-simple');
const { authorizationError } = require('../errors');
const { authorizationErrorMessage } = require('../helpers/constants');
const config = require('../../config');
const logger = require('../logger');

const { secret } = config.common.token;

const validateToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw authorizationError(authorizationErrorMessage);
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
    logger.error(error);
    next(authorizationError(error.message));
  }
};
module.exports = validateToken;
