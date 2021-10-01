const logger = require('../logger');

const { weetsInteractor } = require('../interactors/weets');

exports.weet = async (req, res, next) => {
  try {
    const weet = await weetsInteractor(req, res, next);
    res.status(201).send(weet);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
