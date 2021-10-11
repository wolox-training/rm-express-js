const { User, Rating } = require('../models');
const { sequelize } = require('../models');
const logger = require('../logger');

exports.findRateWeet = async (id, ratingUserId) => {
  const rating = await Rating.findOne({ where: { weetId: id, ratingUserId } });
  return rating;
};

exports.createRateWeet = async rateWeetData => {
  let transaction = {};
  const { ratingUserId, weetId, score, userId, newPoints } = rateWeetData;
  try {
    transaction = await sequelize.transaction();
    const rateWeet = await Rating.create({ ratingUserId, score, weetId }, { transaction });
    await User.update({ points: newPoints }, { where: { id: userId }, individualHooks: true, transaction });
    await transaction.commit();
    logger.info(`rate weet: ${rateWeet}`);
    return rateWeet;
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    throw error;
  }
};

exports.updateRateWeet = async rateWeetData => {
  let transaction = {};
  const { ratingId, score, userId, newPoints } = rateWeetData;
  try {
    transaction = await sequelize.transaction();
    const rateWeet = await Rating.update(
      { score },
      { where: { id: ratingId }, returning: true, transaction }
    );
    await User.update({ points: newPoints }, { where: { id: userId }, individualHooks: true, transaction });
    await transaction.commit();
    logger.info(`rate weet: ${rateWeet}`);
    return rateWeet[1][0];
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    throw error;
  }
};
