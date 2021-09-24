const supertest = require('supertest');

const app = require('../app');
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
  it('should respond succesfully if it passes all validations', () =>
    createUser(mockUser).then(res => {
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('userId');
    }));

  it('should fail with error if email already exist', () =>
    createUser(mockUser).then(res => {
      expect(res.statusCode).toBe(503);
      expect(res.body.internal_code).toContain('database_error');
    }));

  it('should fail with validation error if pass invalid password', () =>
    createUser(mockUserInvalidPass).then(res => {
      expect(res.statusCode).toBe(400);
      expect(res.body.internal_code).toContain('validation_error');
    }));

  it('should fail whit validation error if firsName is missing', () =>
    createUser(mockUserMissingFirstName).then(res => {
      expect(res.statusCode).toBe(400);
      expect(res.body.internal_code).toContain('validation_error');
      expect(res.body.message[0].message).toContain("must have required property 'firstName'");
    }));

  it('should fail whit validation error if lastName is missing', () =>
    createUser(mockUserMissingLastName).then(res => {
      expect(res.statusCode).toBe(400);
      expect(res.body.internal_code).toContain('validation_error');
      expect(res.body.message[0].message).toContain("must have required property 'lastName'");
    }));
  it('should fail whit validation error if email is missing', () =>
    createUser(mockUserMissingEmail).then(res => {
      expect(res.statusCode).toBe(400);
      expect(res.body.internal_code).toContain('validation_error');
      expect(res.body.message[0].message).toContain("must have required property 'email'");
    }));

  it('should fail whit validation error if password is missing', () =>
    createUser(mockUserMissingPassword).then(res => {
      expect(res.statusCode).toBe(400);
      expect(res.body.internal_code).toContain('validation_error');
      expect(res.body.message[0].message).toContain("must have required property 'password'");
    }));
});
