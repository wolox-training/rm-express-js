const logger = require('../logger');
const { encode } = require('../helpers/jwt');

const { hashPassword, comparePassword } = require('../helpers/encrypt');
const { createUser, findUserByEmail } = require('../services/users');
const { notFoundError, authenticationError } = require('../errors');
const { userNotFoundErrorMessage, authenticationErrorMessage } = require('../helpers/constants');

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

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) throw notFoundError(userNotFoundErrorMessage);
    const isMatch = await comparePassword(password, user);
    if (!isMatch) throw authenticationError(authenticationErrorMessage);
    const payload = { id: user.userId, username: user.email };
    const token = encode(payload);
    res.status(201).send({ token });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
