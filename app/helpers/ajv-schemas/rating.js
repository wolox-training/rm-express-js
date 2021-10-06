const ajvInstance = require('./ajv-instance');

const schema = {
  type: 'object',
  properties: {
    ratingUserId: { type: 'integer' },
    score: {
      type: 'number',
      enum: [1, -1]
    }
  },
  required: ['ratingUserId', 'score'],
  additionalProperties: false
};

module.exports = ajvInstance.compile(schema);
