const ajvInstance = require('./ajv-instance');

const schema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', pattern: '@wolox', format: 'email' },
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
    }
  },
  required: ['firstName', 'lastName', 'email', 'password'],
  additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
