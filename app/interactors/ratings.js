const { notFoundError } = require('../errors');
const { weetNotFoundErrorMessage, userNotFoundErrorMessage } = require('../helpers/constants');
const logger = require('../logger');
const { sequelize } = require('../models');
const { findRateWeet, updateRateWeet, createRateWeet } = require('../services/ratings');
const { getWeetById } = require('../services/weets');
const { getUserById, updateUser } = require('../services/users');

exports.rateWeetsInteractor = async (params, body) => {
  let transaction = {};
  const weetId = params.id;
  const { ratingUserId, score } = body;
  try {
    transaction = await sequelize.transaction();
    const weet = await getWeetById(weetId, transaction);
    if (!weet) throw notFoundError(weetNotFoundErrorMessage);
    const { userId } = weet;
    const user = await getUserById(userId, transaction);
    if (!user) throw notFoundError(userNotFoundErrorMessage);
    const currentPoints = user.points;
    const previousRatedWeet = await findRateWeet(weetId, ratingUserId, transaction);
    if (!previousRatedWeet) {
      const newPoints = currentPoints + score;
      const rateWeetCreate = await createRateWeet({ ratingUserId, weetId, score }, transaction);
      await updateUser(userId, { points: newPoints }, transaction);
      await transaction.commit();
      return rateWeetCreate;
    }
    const ratingId = previousRatedWeet.id;
    if (previousRatedWeet.score !== score) {
      const newPoints = currentPoints + score + score;
      const rateWeetUpdate = await updateRateWeet({ ratingId, score }, transaction);
      await updateUser(userId, { points: newPoints }, transaction);
      await transaction.commit();
      return rateWeetUpdate;
    }
    await transaction.commit();
    logger.info('previous rating weet is:', previousRatedWeet);
    return previousRatedWeet;
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    throw error;
  }
};
