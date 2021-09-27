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
