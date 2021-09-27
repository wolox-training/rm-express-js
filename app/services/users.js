const logger = require('../logger');

const { User } = require('../models');
const { databaseError } = require('../errors');

exports.createUser = async userdata => {
  try {
    const response = await User.create(userdata);
    return response;
  } catch (error) {
    logger.error(error.name);
    throw databaseError(error.message);
  }
};

exports.findUserByEmail = async email => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    logger.error(error.name);
    throw databaseError(error.message);
  }
};
