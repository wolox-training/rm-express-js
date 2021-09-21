const axios = require('axios');

const { randomWeetEndpoint } = require('../../config').common.weetApi;
const { externalApiError, notFoundError } = require('../errors');

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
