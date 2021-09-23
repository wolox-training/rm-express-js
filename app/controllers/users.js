const logger = require('../logger');

const { hashPassword } = require('../helpers/encrypt');
const { createUser } = require('../services/users');

exports.signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPass = await hashPassword(password);
    const user = await createUser({ firstName, lastName, email, password: hashPass });
    logger.info(`user ${user.id} was created succesfully`);
    res.status(201).send({ userId: user.id });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
