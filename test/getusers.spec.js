const supertest = require('supertest');

const app = require('../app');
const { AUTHORIZATION_ERROR } = require('../app/errors');
const { mockUser } = require('./mocks/mockUsers.js');

const request = supertest(app);
const createUser = user => request.post('/users').send(user);
const signIn = user => request.post('/users/sessions').send(user);
const getUsers = (token, page = 1, limit = 10) =>
  request
    .get('/users')
    .set('Authorization', `Bearer ${token}`)
    .query({ page, limit });

let userToken = null;
beforeAll(async () => {
  await createUser(mockUser);
  const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
  userToken = signInData.body.token;
});

describe('GET /users/sessions', () => {
  it('should get users if user is authenticated', async () => {
    const data = await getUsers(userToken);
    expect(data.statusCode).toBe(200);
    expect(data.body).toHaveProperty('users');
  });

  it('should fail if user is not authenticated', async () => {
    const data = await getUsers(null);
    expect(data.statusCode).toBe(401);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });
});
