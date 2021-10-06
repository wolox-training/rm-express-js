const { User, Weet, Rating } = require('../models');
const { sequelize } = require('../models');
const logger = require('../logger');

exports.findRateWeet = async (id, ratingUserId) => {
  const rating = await Rating.findOne({ where: { weetId: id, ratingUserId } });
  return rating;
};

exports.createRateWeet = async (previousRateId, weetId, body) => {
  let transaction = {};
  const { score, ratingUserId } = body;
  try {
    transaction = await sequelize.transaction();
    const currentRatedWeet = await Rating.upsert(
      {
        id: previousRateId,
        ratingUserId,
        score,
        weetId
      },
      {
        where: { id: previousRateId },
        returning: true
      }
    );
    const weet = await Weet.findOne(
      {
        include: [{ model: User, required: true, attributes: ['id', 'points'] }],
        returning: true
      },
      { where: { id: weetId } }
    );
    logger.info(`actual weet is: ${weet}`);
    const weetUserId = weet && weet.User.id;
    const currentPoints = weet && weet.User.points;
    await User.update(
      { points: currentPoints + score },
      { where: { id: weetUserId }, individualHooks: true }
    );
    await transaction.commit();
    return currentRatedWeet[0];
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    throw error;
  }
};
