const { externalApiError } = require('../errors');
const logger = require('../logger');

const { externalApiErrorMessage } = require('../helpers/constants');
const { createWeet, getWeet } = require('../services/weets');

exports.weet = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const weet = await getWeet();
    const content = weet ? weet.quoteText : next(externalApiError(externalApiErrorMessage));
    const weetResp = await createWeet({ userId, content });
    logger.info(`weet ${weetResp.id} was created succesfully`);
    res.status(201).send({ weetId: weetResp.id });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
