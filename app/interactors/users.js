const logger = require('../logger');
const { encode } = require('../helpers/jwt');
const { createUser, getUsers, findUserByEmail, createAdminUser } = require('../services/users');
const { pagination } = require('../helpers/pagination');
const { notFoundError, authenticationError, authorizationError } = require('../errors');
const {
  userNotFoundErrorMessage,
  authenticationErrorMessage,
  authorizationErrorMessage
} = require('../helpers/constants');
const { hashPassword, comparePassword } = require('../helpers/encrypt');

exports.signUpInteractor = async body => {
  const { firstName, lastName, email, password } = body;
  const hashPass = await hashPassword(password);
  const user = await createUser({ firstName, lastName, email, password: hashPass });
  logger.info(`user ${user.id} was created succesfully`);
  return { userId: user.id };
};

exports.signInInteractor = async body => {
  const { email, password } = body;
  const user = await findUserByEmail(email);
  if (!user) throw notFoundError(userNotFoundErrorMessage);
  const isMatch = await comparePassword(password, user);
  if (!isMatch) throw authenticationError(authenticationErrorMessage);
  const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin };
  const token = encode(payload);
  return token;
};

exports.getUsersInteractor = async query => {
  const { limit, offset } = pagination(query);
  const users = await getUsers(limit, offset);
  if (!users) throw notFoundError(userNotFoundErrorMessage);
  return { users };
};

exports.createAdminUserInteractor = async (user, body) => {
  const { isAdmin } = user;
  if (!isAdmin) throw authorizationError(authorizationErrorMessage);
  const { firstName, lastName, email, password } = body;
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
  return { userId: adminUser[0].id };
};
