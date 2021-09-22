const { User } = require('../models');

const { databaseError } = require('../errors');

exports.createUser = user =>
  User.createUser(user).catch(error => {
    throw databaseError(error.message);
  });
