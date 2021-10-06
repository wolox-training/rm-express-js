/* eslint-disable prettier/prettier */
const { createWeetInteractor, getWeetsInteractor } = require('../interactors/weets');
const logger = require('../logger');

exports.weet = async (req, res, next) => {
  try {
    const weet = await createWeetInteractor(req.user);
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
