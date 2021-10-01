module.exports = {
  '/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'user was created succesfully',
          content: {
            'application/json': {
              example: {
                userId: 1
              }
            }
          }
        },
        503: {
          description: 'database error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'validation error',
                internal_code: 'database_error'
              }
            }
          }
        },
        400: {
          description: 'validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: [
                  {
                    instancePath: '/firstName',
                    schemaPath: '#/properties/firstName/type',
                    keyword: 'type',
                    params: {
                      type: 'string'
                    },
                    message: 'must be string'
                  }
                ],
                internal_code: 'validation_error'
              }
            }
          }
        }
      }
    }
  }
};
