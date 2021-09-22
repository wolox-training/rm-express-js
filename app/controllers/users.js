const logger = require('../logger');

const { hashPassword } = require('../helpers/encrypt');
const { createUser } = require('../services/users');

exports.signUp = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  return hashPassword(password)
    .then(hashPass => createUser({ firstName, lastName, email, password: hashPass }))
    .then(user => {
      logger.info(`user ${user.firstName} was created succesfully`);
      res.status(201).send({ userId: user.id });
    })
    .catch(error => {
      logger.error(error.message);
      next(error);
    });
};
