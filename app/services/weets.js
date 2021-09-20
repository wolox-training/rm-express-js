const axios = require('axios');

const { externalApiError, notFoundError } = require('../errors');

exports.getWeet = () =>
  axios
    .get('https://quote-garden.herokuapp.com/api/v3/quotes/rando')
    .then(response => response.data.data[0])
    .catch(error => {
      if (error.response && error.response.status === 404) {
        return notFoundError(error.message);
      }
      return externalApiError(error.message);
    });
