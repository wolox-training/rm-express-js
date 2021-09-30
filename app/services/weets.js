const axios = require('axios');
const { Weet } = require('../models');
const logger = require('../logger');

const { randomWeetEndpoint } = require('../../config').common.weetApi;
const { externalApiError, notFoundError, databaseError } = require('../errors');
const { databaseErrorMessage } = require('../helpers/constants');

exports.getWeet = async () => {
  try {
    const response = await axios.get(randomWeetEndpoint);
    return response.data.data[0];
  } catch (error) {
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
