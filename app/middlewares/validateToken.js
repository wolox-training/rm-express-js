const { authorizationError, authenticationError } = require('../errors');
const {
  authorizationErrorMessage,
  authenticationErrorMessage,
  userNotFoundErrorMessage,
  sessionExpiredErrorMessage
} = require('../helpers/constants');
const logger = require('../logger');
const { decode } = require('../helpers/jwt');
const { User } = require('../models');

const verifyUser = async payload => {
  const userData = await User.findOne({ where: { id: payload.id } });
  if (!userData) throw authenticationError(userNotFoundErrorMessage);
  return userData;
};

const verifySession = (payload, sessionExpire) => {
  if (!sessionExpire) return payload;
  const { iat, exp } = payload;
  const now = Date.now() / 1000;
  const sessionExpireDate = new Date(sessionExpire).getTime() / 1000;
  if (sessionExpireDate && sessionExpireDate > iat) {
    throw authenticationError(sessionExpiredErrorMessage);
  }
  if (exp < now) {
    throw authenticationError(sessionExpiredErrorMessage);
  }
  return payload;
};

exports.validateToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw authenticationError(authenticationErrorMessage);
    }
    const token = req.headers.authorization.split(' ')[1];
    const { payload } = decode(token);

    const user = await verifyUser(payload);
    const { sessionExpire } = user;

    const session = verifySession(payload, sessionExpire);

    // eslint-disable-next-line require-atomic-updates
    req.user = {
      id: session.id,
      email: session.email,
      isAdmin: session.isAdmin
    };

    next();
  } catch (error) {
    logger.error(error.message);
    next(authorizationError(authorizationErrorMessage));
  }
};
