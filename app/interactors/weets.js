const { createWeet, getWeet } = require('../services/weets');
const logger = require('../logger');
const { externalApiError, validationError } = require('../errors');
const { externalApiErrorMessage, weetErrorMessage } = require('../helpers/constants');
const { pagination } = require('../helpers/pagination');
const { notFoundError } = require('../errors');
const { weetNotFoundErrorMessage } = require('../helpers/constants');
const { getWeets, rateWeets } = require('../services/weets');

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

exports.getWeetsInteractor = async query => {
  const { limit, offset } = pagination(query);
  const weets = await getWeets(limit, offset);
  if (!weets) throw notFoundError(weetNotFoundErrorMessage);
  return { weets };
};

exports.rateWeetsInteractor = async (query, body) => {
  const { id } = query;
  const wrate = await rateWeets(id, body);
  if (!wrate) throw notFoundError(weetNotFoundErrorMessage);
  return { wrate };
};
