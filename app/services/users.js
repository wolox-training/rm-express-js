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
