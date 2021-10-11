const { notFoundError } = require('../errors');
const { weetNotFoundErrorMessage, userNotFoundErrorMessage } = require('../helpers/constants');
const logger = require('../logger');
const { findRateWeet, updateRateWeet, createRateWeet } = require('../services/ratings');
const { getWeetById } = require('../services/weets');
const { getUserById } = require('../services/users');

exports.rateWeetsInteractor = async (params, body) => {
  const weetId = params.id;
  const { ratingUserId, score } = body;
  const weet = await getWeetById(weetId);
  if (!weet) throw notFoundError(weetNotFoundErrorMessage);
  const { userId } = weet;
  const user = await getUserById(userId);
  if (!user) throw notFoundError(userNotFoundErrorMessage);
  const newPoints = user.points + score;
  const previousRatedWeet = await findRateWeet(weetId, ratingUserId);
  if (!previousRatedWeet) return createRateWeet({ ratingUserId, weetId, score, userId, newPoints });
  const ratingId = previousRatedWeet.id;
  if (previousRatedWeet.score !== score) return updateRateWeet({ ratingId, score, userId, newPoints });
  logger.info('previous rating weet is:', previousRatedWeet);
  return previousRatedWeet;
};
