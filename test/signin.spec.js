const supertest = require('supertest');

const app = require('../app');
const { AUTHENTICATION_ERROR, VALIDATION_ERROR, NOT_FOUND_ERROR } = require('../app/errors');
const {
  mockUser,
  mockUserInvalidPass,
  mockUserNotMatchPass,
  mockUserChangeEmail,
  mockUserInvalidEmail
} = require('./mocks/mockUsers.js');

const request = supertest(app);
const createUser = user => request.post('/users').send(user);
const signIn = user => request.post('/users/sessions').send(user);

describe('POST /users/sessions', () => {
  it('should respond a token if user email and password are valid', async () => {
    await createUser(mockUser);
    const data = await signIn({ email: mockUser.email, password: mockUser.password });
    expect(data.statusCode).toBe(200);
    expect(data.body).toHaveProperty('token');
  });

  it('should fail with error if user not found', async () => {
    await createUser(mockUser);
    const data = await signIn({
      email: mockUserChangeEmail.email,
      password: mockUser.password
    });
    expect(data.statusCode).toBe(404);
    expect(data.body.internal_code).toContain(NOT_FOUND_ERROR);
  });

  it('should fail with error if email is invalid', async () => {
    await createUser(mockUser);
    const data = await signIn({ email: mockUserInvalidEmail.email, password: mockUser.password });
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
  });

  it('should fail with error if password is invalid', async () => {
    await createUser(mockUser);
    const data = await signIn({ email: mockUser.email, password: mockUserInvalidPass.password });
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
  });

  it('should fail with error if password does not match', async () => {
    await createUser(mockUser);
    const data = await signIn({ email: mockUser.email, password: mockUserNotMatchPass.password });
    expect(data.statusCode).toBe(401);
    expect(data.body.internal_code).toContain(AUTHENTICATION_ERROR);
  });
});
