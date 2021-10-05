const { createWeet, getWeet } = require('../services/weets');
const logger = require('../logger');
const { externalApiError, validationError } = require('../errors');
const { externalApiErrorMessage, weetErrorMessage } = require('../helpers/constants');

exports.createWeetInteractor = async user => {
  const userId = user.id;
  const weet = await getWeet();
  if (!weet) throw externalApiError(externalApiErrorMessage);
  if (weet.quoteText.length > 140) throw validationError(weetErrorMessage);
  const content = weet.quoteText;
  const weetResp = await createWeet({ userId, content });
  logger.info(`weet ${weetResp.id} was created succesfully`);
  return { weetId: weetResp.id };
};
