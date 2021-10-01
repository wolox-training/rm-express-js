const { createWeet, getWeet } = require('../services/weets');
const logger = require('../logger');
const { externalApiError, validationError } = require('../errors');
const { externalApiErrorMessage, weetErrorMessage } = require('../helpers/constants');

exports.weetsInteractor = async (req, res, next) => {
  const userId = req.user.id;
  const weet = await getWeet();
  if (!weet) return next(externalApiError(externalApiErrorMessage));
  if (weet.quoteText.length > 140) return next(validationError(weetErrorMessage));
  const content = weet.quoteText;
  const weetResp = await createWeet({ userId, content });
  logger.info(`weet ${weetResp.id} was created succesfully`);
  return { weetId: weetResp.id };
};
