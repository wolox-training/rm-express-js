const jwt = require('jwt-simple');
const supertest = require('supertest');
const { factory } = require('factory-girl');
const app = require('../app');
const { AUTHORIZATION_ERROR } = require('../app/errors');
const { User } = require('../app/models');
const { mockUserVerified, mockUserAlt } = require('./mocks/mockUsers.js');

const request = supertest(app);
const getUsers = (token, page = 1, limit = 10) =>
  request
    .get('/users')
    .set('Authorization', `Bearer ${token}`)
    .query({ page, limit });

const verify = jest.spyOn(jwt, 'decode');
factory.define('user', User, {});

beforeEach(async done => {
  verify.mockImplementationOnce(token => {
    const decode = token === 'fail' ? token : { payload: { ...mockUserVerified } };
    return decode;
  });
  await factory.create('user', { id: 2, ...mockUserAlt });
  done();
});

describe('GET /users/sessions', () => {
  it('should get users if user is authenticated', async () => {
    const data = await getUsers('userToken');
    expect(data.statusCode).toBe(200);
    expect(data.body).toHaveProperty('users');
  });

  it('should fail if user is not authenticated', async () => {
    const data = await getUsers('fail');
    expect(data.statusCode).toBe(403);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });
});
