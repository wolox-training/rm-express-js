const logger = require('../logger');
const {
  getUsersInteractor,
  signInInteractor,
  signUpInteractor,
  createAdminUserInteractor,
  invalidateSessionsInteractor
} = require('../interactors/users');

exports.signUp = async (req, res, next) => {
  try {
    const user = await signUpInteractor(req.body);
    res.status(201).send(user);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const token = await signInInteractor(req.body);
    res.status(200).send({ token });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await getUsersInteractor(req.query);
    res.status(200).send(users);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

exports.adminUser = async (req, res, next) => {
  try {
    const adminUser = await createAdminUserInteractor(req.user, req.body);
    res.status(201).send(adminUser);
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

exports.invalidateSessions = async (req, res, next) => {
  try {
    const { user } = req;
    const session = await invalidateSessionsInteractor(user);
    logger.info(session);
    res.status(204).end();
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};
