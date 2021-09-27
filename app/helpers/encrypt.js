const bcrypt = require('bcryptjs');
const logger = require('../logger');
const { encryptionError } = require('../errors');

exports.hashPassword = password =>
  bcrypt
    .hash(password, 10)
    .then(password)
    .catch(error => {
      logger.error(error.message);
      throw encryptionError(error.message);
    });

exports.comparePassword = async (password, user) => {
  try {
    return await bcrypt.compare(password, user.password);
  } catch (error) {
    throw encryptionError(error.message);
  }
};
