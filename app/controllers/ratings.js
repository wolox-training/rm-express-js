const { rateWeetsInteractor } = require('../interactors/ratings');
const logger = require('../logger');

exports.rateWeet = async (req, res, next) => {
  try {
    const weetRated = await rateWeetsInteractor(req.params, req.body);
    res.status(200).send(weetRated);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
