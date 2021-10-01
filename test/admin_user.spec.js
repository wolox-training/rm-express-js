const supertest = require('supertest');
const { User } = require('../app/models');

const app = require('../app');
const { VALIDATION_ERROR, AUTHORIZATION_ERROR } = require('../app/errors');
const {
  mockUser,
  mockUserAlt,
  mockUserInvalidPass,
  mockUserMissingFirstName,
  mockUserMissingLastName,
  mockUserMissingPassword,
  mockUserMissingEmail
} = require('./mocks/mockUsers.js');

const request = supertest(app);
const createUser = user => request.post('/users').send(user);
const signIn = user => request.post('/users/sessions').send(user);
let userToken = null;
beforeAll(async () => {
  await createUser(mockUserAlt);
  await User.update({ isAdmin: true }, { where: { email: mockUserAlt.email } });
  const signInData = await signIn({ email: mockUserAlt.email, password: mockUserAlt.password });
  userToken = signInData.body.token;
});
const createAdminUser = (token, user) =>
  request
    .post('/admin/users')
    .set('Authorization', `Bearer ${token}`)
    .send(user);

describe('POST /admin/users', () => {
  it('should respond succesfully if it passes all validations', async () => {
    const data = await createAdminUser(userToken, mockUser);
    expect(data.statusCode).toBe(201);
    expect(data.body).toHaveProperty('userId');
  });

  it('should update to adminUser if user already exist', async () => {
    await createAdminUser(mockUser);
    const data = await createAdminUser(userToken, mockUser);
    expect(data.statusCode).toBe(201);
    expect(data.body).toHaveProperty('userId');
  });

  it('should fail if request user is not authenticated', async () => {
    const data = await createAdminUser(null, mockUser);
    expect(data.statusCode).toBe(403);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });

  it('should fail if request user is not an admin user', async () => {
    await createUser(mockUser);
    const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
    const noAdminToken = signInData.body.token;
    const data = await createAdminUser(noAdminToken, mockUserAlt);
    expect(data.statusCode).toBe(403);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });

  it('should fail with validation error if pass invalid password', async () => {
    const data = await createAdminUser(userToken, mockUserInvalidPass);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
  });

  it('should fail whit validation error if firsName is missing', async () => {
    const data = await createAdminUser(userToken, mockUserMissingFirstName);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('firstName');
  });

  it('should fail whit validation error if lastName is missing', async () => {
    const data = await createAdminUser(userToken, mockUserMissingLastName);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('lastName');
  });

  it('should fail whit validation error if email is missing', async () => {
    const data = await createAdminUser(userToken, mockUserMissingEmail);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('email');
  });

  it('should fail whit validation error if password is missing', async () => {
    const data = await createAdminUser(userToken, mockUserMissingPassword);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('password');
  });
});
