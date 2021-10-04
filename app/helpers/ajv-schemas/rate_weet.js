const ajvInstance = require('./ajv-instance');

const schema = {
  type: 'object',
  properties: {
    ratinUserId: { type: 'integer' },
    weet_id: { type: 'integer' },
    score: {
      type: 'number',
      pattern: '^[-+](1)$'
    }
  },
  required: ['firstName', 'lastName', 'email', 'password'],
  additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
