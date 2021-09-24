const { validationError } = require('../errors');

function validateDto(ajvValidate) {
  return (req, res, next) => {
    const valid = ajvValidate(req.body);
    if (!valid) {
      const { errors } = ajvValidate;
      return next(validationError(errors));
    }
    return next();
  };
}
module.exports = validateDto;
