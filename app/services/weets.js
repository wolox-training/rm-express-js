const axios = require('axios');

const { Weet, Wrate, User } = require('../models');
const { sequelize } = require('../models');
const logger = require('../logger');

const { randomWeetEndpoint } = require('../../config').common.weetApi;
const { externalApiError, notFoundError, databaseError } = require('../errors');
const { databaseErrorMessage } = require('../helpers/constants');

exports.getWeet = async () => {
  try {
    const response = await axios.get(randomWeetEndpoint);
    return response.data.data[0];
  } catch (error) {
    logger.error(error.message);
    if (error.response && error.response.status === 404) {
      throw notFoundError(error.message);
    }
    throw externalApiError(error.message);
  }
};

exports.createWeet = async weetData => {
  try {
    const response = await Weet.create(weetData);
    return response;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(databaseErrorMessage);
  }
};

exports.getWeets = async (limit, offset) => {
  try {
    const weets = await Weet.findAndCountAll({
      where: {},
      limit,
      offset
    });
    return weets;
  } catch (error) {
    logger.error(error.message);
    throw databaseError(databaseErrorMessage);
  }
};

exports.rateWeets = async (id, body) => {
  let transaction = {};
  try {
    transaction = await sequelize.transaction();
    // Create transaction
    const wrates = await Wrate.create({ ...body });
    // Get transmitter account
    const receptor = await User.findOne({ where: { id } });
    // Get user account
    await receptor.increment('points', { by: body.score, transaction });
    // Increment user points
    await transaction.commit();
    // Commit the transaction
    return { wrates };
  } catch (err) {
    if (transaction.rollback) await transaction.rollback();
    // Rollback the transaction in case of error
    throw err;
  }
};
