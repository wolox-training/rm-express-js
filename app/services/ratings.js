const { Rating } = require('../models');
const logger = require('../logger');

exports.findRateWeet = async (id, ratingUserId, transaction) => {
  const rating = await Rating.findOne({ where: { weetId: id, ratingUserId }, transaction });
  return rating;
};

exports.createRateWeet = async (rateWeetData, transaction) => {
  const { ratingUserId, weetId, score } = rateWeetData;
  const rateWeet = await Rating.create({ ratingUserId, score, weetId }, { transaction });
  logger.info(`rate weet: ${rateWeet}`);
  return rateWeet;
};

exports.updateRateWeet = async (rateWeetData, transaction) => {
  const { ratingId, score } = rateWeetData;
  const rateWeet = await Rating.update({ score }, { where: { id: ratingId }, returning: true, transaction });
  logger.info(`rate weet: ${rateWeet}`);
  return rateWeet[1][0];
};
