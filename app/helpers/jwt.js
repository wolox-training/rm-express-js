const jwt = require('jwt-simple');
const config = require('../../config');

const { secret } = config.common.token;

exports.encode = payload => jwt.encode({ payload }, secret);
exports.decode = token => jwt.decode(token, secret);
