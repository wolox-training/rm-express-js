const logger = require('../logger');

const { User } = require('../models');
const { databaseError } = require('../errors');
const { databaseErrorMessage } = require('../helpers/constants');

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
    return response;
  } catch (error) {
    logger.error(error.name);
    throw databaseError(error.message);
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
    logger.error(error.name);
    throw databaseError(error.message);
  }
};

exports.getUserById = async id => {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(databaseErrorMessage);
  }
};
