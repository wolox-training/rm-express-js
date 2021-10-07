const logger = require('../logger');
const { encode } = require('../helpers/jwt');

const { User } = require('../models');
const { databaseError } = require('../errors');
const { databaseErrorMessage, secondsOffset } = require('../helpers/constants');

exports.createUser = async userdata => {
  try {
    const response = await User.create(userdata);
    return response;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(databaseErrorMessage);
  }
};

exports.findUserByEmail = async email => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(databaseErrorMessage);
  }
};

exports.getUsers = async (limit, offset) => {
  try {
    const users = await User.findAndCountAll({
      where: {},
      attributes: { exclude: ['password'] },
      limit,
      offset
    });
    return users;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(databaseErrorMessage);
  }
};

exports.updateUser = async (userId, userData) => {
  try {
    const response = await User.update(userData, { where: { id: userId }, individualHooks: true });
    logger.info('user updated response', response);
    return response;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(databaseErrorMessage);
  }
};

exports.createAdminUser = async userData => {
  try {
    const response = await User.upsert(userData, {
      where: { email: userData.email },
      returning: true
    });
    return response;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(databaseErrorMessage);
  }
};

exports.generateToken = user => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + secondsOffset;
  const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin, iat, exp };
  const token = encode(payload);
  return token;
};
