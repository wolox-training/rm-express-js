/* eslint-disable prettier/prettier */
const {
  weetsInteractor,
  getWeetsInteractor,
  rateWeetsInteractor
} = require('../interactors/weets');
const logger = require('../logger');

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

exports.rateWeets = async (req, res, next) => {
  try {
    const wrate = await rateWeetsInteractor(req.query, req.body);
    res.status(200).send(wrate);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
