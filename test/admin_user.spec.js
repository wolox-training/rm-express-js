const jwt = require('jwt-simple');
const { factory } = require('factory-girl');
const supertest = require('supertest');
const { User } = require('../app/models');

const app = require('../app');
const { VALIDATION_ERROR, AUTHORIZATION_ERROR } = require('../app/errors');
const {
  mockUser,
  mockUserVerified,
  mockUserAlt,
  mockUserInvalidPass,
  mockUserMissingFirstName,
  mockUserMissingLastName,
  mockUserMissingPassword,
  mockUserMissingEmail
} = require('./mocks/mockUsers.js');

const request = supertest(app);
const verify = jest.spyOn(jwt, 'decode');
factory.define('user', User, {});

beforeEach(async done => {
  await factory.create('user', { id: 2, ...mockUserAlt, isAdmin: true });
  verify.mockImplementation(token => {
    const userType = {
      fail: 'fail',
      admin: { payload: { ...mockUserVerified } },
      generic: { payload: { ...mockUserVerified, isAdmin: false } }
    };
    return userType[token];
  });
  done();
});
const createAdminUser = (token, user) =>
  request
    .post('/admin/users')
    .set('Authorization', `Bearer ${token}`)
    .send(user);

describe('POST /admin/users', () => {
  it('should respond succesfully if it pass all validations', async () => {
    const data = await createAdminUser('admin', mockUser);
    expect(data.statusCode).toBe(201);
    expect(data.body).toHaveProperty('userId');
  });

  it('should update to adminUser if user already exist', async () => {
    await createAdminUser(mockUser);
    const data = await createAdminUser('admin', mockUser);
    expect(data.statusCode).toBe(201);
    expect(data.body).toHaveProperty('userId');
  });

  it('should fail if request user is not authenticated', async () => {
    const data = await createAdminUser('fail', mockUser);
    expect(data.statusCode).toBe(403);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });

  it('should fail if request user is not an admin user', async () => {
    const data = await createAdminUser('generic', mockUserAlt);
    expect(data.statusCode).toBe(403);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });

  it('should fail with validation error if pass invalid password', async () => {
    const data = await createAdminUser('admin', mockUserInvalidPass);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
  });

  it('should fail whit validation error if firsName is missing', async () => {
    const data = await createAdminUser('admin', mockUserMissingFirstName);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('firstName');
  });

  it('should fail whit validation error if lastName is missing', async () => {
    const data = await createAdminUser('admin', mockUserMissingLastName);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('lastName');
  });

  it('should fail whit validation error if email is missing', async () => {
    const data = await createAdminUser('admin', mockUserMissingEmail);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('email');
  });

  it('should fail whit validation error if password is missing', async () => {
    const data = await createAdminUser('admin', mockUserMissingPassword);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message[0].params.missingProperty).toContain('password');
  });
});
