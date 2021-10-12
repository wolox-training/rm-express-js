const logger = require('../logger');
const { emailSendError } = require('../errors');

const { welcomeEmailMessage, emailSendErrorMessage } = require('../helpers/constants');
const { transporter } = require('../helpers/send_mail');
const { senderAddress } = require('../../config').common.email;

exports.sendWelcomeEmail = async user => {
  try {
    const mail = await transporter.sendMail({
      from: senderAddress,
      to: user.email,
      subject: welcomeEmailMessage,
      text: `${user.firstName}, ${welcomeEmailMessage}`,
      html: `<b>${user.firstName}, ${welcomeEmailMessage}</b>`
    });
    logger.info(transporter.options);
    return mail;
  } catch (error) {
    logger.error(error.message);
    throw emailSendError(emailSendErrorMessage);
  }
};
