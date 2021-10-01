module.exports = {
  id: {
    type: 'integer',
    description: 'User identification number',
    example: 1
  },
  firstName: {
    type: 'string',
    description: 'User first name',
    example: 'juan'
  },
  lastName: {
    type: 'string',
    description: 'User last name',
    example: 'henao'
  },
  email: {
    type: 'string',
    description: 'User email',
    example: 'juan.henao@wolox.co'
  },
  password: {
    type: 'string',
    description: 'User password',
    example: 'A123456a'
  },

  User: {
    type: 'object',
    properties: {
      firstName: {
        $ref: '#/components/schemas/firstName'
      },
      lastName: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  }
};
