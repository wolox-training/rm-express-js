const axios = require('axios');
const { Weet } = require('../models');
const logger = require('../logger');

const { randomWeetEndpoint } = require('../../config').common.weetApi;
const { externalApiError, notFoundError, databaseError } = require('../errors');
const { databaseErrorMessage } = require('../helpers/constants');

exports.getWeet = () =>
  axios
    .get(randomWeetEndpoint)
    .then(response => response.data.data[0])
    .catch(error => {
      if (error.response && error.response.status === 404) {
        return notFoundError(error.message);
      }
      return externalApiError(error.message);
    });

exports.createWeet = async weetData => {
  try {
    const response = await Weet.create(weetData);
    return response;
  } catch (error) {
    logger.error(error.toString());
    throw databaseError(databaseErrorMessage);
  }
};
