const supertest = require('supertest');

const app = require('../app');
const { VALIDATION_ERROR, DATABASE_ERROR } = require('../app/errors');
const {
  mockUser,
  mockUserInvalidPass,
  mockUserMissingFirstName,
  mockUserMissingLastName,
  mockUserMissingPassword,
  mockUserMissingEmail
} = require('./mocks/mockUsers.js');

const request = supertest(app);
const createUser = user => request.post('/users').send(user);
describe('POST /users', () => {
  it('should respond succesfully if it passes all validations', async () => {
    const data = await createUser(mockUser);
    expect(data.statusCode).toBe(201);
    expect(data.body).toHaveProperty('userId');
  });

  it('should fail with error if email already exist', async () => {
    await createUser(mockUser);
    const data = await createUser(mockUser);
    expect(data.statusCode).toBe(503);
    expect(data.body.internal_code).toContain(DATABASE_ERROR);
  });

  it('should fail with validation error if pass invalid password', async () => {
    const data = await createUser(mockUserInvalidPass);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
  });

  it('should fail whit validation error if firsName is missing', async () => {
    const data = await createUser(mockUserMissingFirstName);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('firstName');
  });

  it('should fail whit validation error if lastName is missing', async () => {
    const data = await createUser(mockUserMissingLastName);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('lastName');
  });

  it('should fail whit validation error if email is missing', async () => {
    const data = await createUser(mockUserMissingEmail);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('email');
  });

  it('should fail whit validation error if password is missing', async () => {
    const data = await createUser(mockUserMissingPassword);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('password');
  });
});
