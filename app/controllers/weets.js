const logger = require('../logger');

const { weetsInteractor, getWeetsInteractor } = require('../interactors/weets');

exports.weet = async (req, res, next) => {
  try {
    const weet = await weetsInteractor(req, res, next);
    res.status(201).send(weet);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

exports.getWeets = async (req, res, next) => {
  try {
    const weets = await getWeetsInteractor(req.query);
    res.status(200).send(weets);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
