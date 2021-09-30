const { validationError } = require('../errors');

exports.validateDto = ajvValidate => (req, res, next) => {
  const valid = ajvValidate(req.body);
  if (!valid) {
    const { errors } = ajvValidate;
    return next(validationError(errors));
  }
  return next();
};
