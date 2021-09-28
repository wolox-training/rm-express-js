const logger = require('../logger');
const { encode } = require('../helpers/jwt');

const { hashPassword, comparePassword } = require('../helpers/encrypt');
const { createUser, createAdminUser, findUserByEmail, getUsers } = require('../services/users');
const { notFoundError, authenticationError, forbiddenError } = require('../errors');
const {
  userNotFoundErrorMessage,
  authenticationErrorMessage,
  forbiddenErrorMessage
} = require('../helpers/constants');

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
    const payload = { id: user.userId, email: user.email, isAdmin: user.isAdmin };
    const token = encode(payload);
    res.status(201).send({ token });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const page = req.query.page ? req.query.page - 1 : 0;
    const limit = req.query.limit || 10;
    const offset = limit * page;
    const users = await getUsers(limit, offset);
    if (!users) throw notFoundError(userNotFoundErrorMessage);
    res.status(201).send({ users });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

exports.adminUser = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) throw forbiddenError(forbiddenErrorMessage);
    const { firstName, lastName, email, password } = req.body;
    const hashPass = await hashPassword(password);
    const adminUser = await createAdminUser({
      firstName,
      lastName,
      email,
      password: hashPass,
      isAdmin: true
    });
    const action = adminUser[1] ? 'created' : 'updated';
    logger.info(`admin user ${adminUser[0].id} was ${action} succesfully`);
    res.status(201).send({ userId: adminUser[0].id });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
