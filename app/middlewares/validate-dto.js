const { validationError } = require('../errors');

const validateDto = ajvValidate => (req, res, next) => {
  const valid = ajvValidate(req.body);
  if (!valid) {
    const { errors } = ajvValidate;
    return next(validationError(errors));
  }
  return next();
};

module.exports = validateDto;
