exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },

    session: {
      secret: 'some-super-secret'
    },
    email: {
      host: process.env.TEST_EMAIL_HOST,
      port: process.env.TEST_EMAIL_PORT,
      senderAddress: process.env.TEST_EMAIL_SENDER_ADDRESS,
      auth: {
        user: process.env.TEST_EMAIL_USER,
        pass: process.env.TEST_EMAIL_PASS
      }
    }
  }
};
