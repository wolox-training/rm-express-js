const logger = require('../logger');

const { createWeetInteractor } = require('../interactors/weets');

exports.weet = async (req, res, next) => {
  try {
    const weet = await createWeetInteractor(req.user);
    res.status(201).send(weet);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
