const ajvInstance = require('./ajv-instance');

const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', pattern: '@wolox', format: 'email' },
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
    }
  },
  required: ['email', 'password'],
  additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
