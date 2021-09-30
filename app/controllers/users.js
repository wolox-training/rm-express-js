const logger = require('../logger');
const { getUsersInteractor, signInInteractor, signUpInteractor } = require('../interactors/users');

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
