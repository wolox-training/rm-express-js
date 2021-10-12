'use strict';
const nodemailer = require('nodemailer');
const config = require('../../config');

const { host, port, auth } = config.common.email;

exports.transporter = nodemailer.createTransport({
  host,
  port,
  auth
});
