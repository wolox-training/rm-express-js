const { createRateWeet } = require('../services/ratings');
const { notFoundError } = require('../errors');
const { weetNotFoundErrorMessage } = require('../helpers/constants');
const logger = require('../logger');
const { findRateWeet } = require('../services/ratings');

exports.rateWeetsInteractor = async (params, body) => {
  const weetId = params.id;
  const { ratingUserId, score } = body;
  const previousRatedWeed = await findRateWeet(weetId, ratingUserId);
  if (previousRatedWeed && previousRatedWeed.score === score) {
    return previousRatedWeed;
  }
  const previousRateId = previousRatedWeed && previousRatedWeed.id;
  logger.info('previous rating weet is:', previousRatedWeed);
  const weetRated = await createRateWeet(previousRateId, weetId, body);
  if (!weetRated) throw notFoundError(weetNotFoundErrorMessage);
  return weetRated;
};
