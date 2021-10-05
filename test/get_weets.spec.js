const supertest = require('supertest');
const { factory } = require('factory-girl');
const { User, Weet } = require('../app/models');
const app = require('../app');
const { AUTHORIZATION_ERROR } = require('../app/errors');
const { mockUser, mockUserAlt } = require('./mocks/mockUsers.js');

const request = supertest(app);
factory.define('user', User, {});
factory.define('weet', Weet, { content: 'loremIpsum', userId: factory.assoc('user', 'id') });

const createUser = user => request.post('/users').send(user);
const signIn = user => request.post('/users/sessions').send(user);

let userToken = null;
beforeAll(async done => {
  await createUser(mockUser);
  const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
  userToken = signInData.body.token;
  done();
});

beforeEach(async done => {
  const userCreated = await factory.create('user', { id: 2, ...mockUserAlt });
  await factory.createMany('weet', 5, { userId: userCreated.id });
  done();
});

const getWeets = (token, page = 1, limit = 10) =>
  request
    .get('/weets')
    .set('Authorization', `Bearer ${token}`)
    .query({ page, limit });

describe('GET /weets', () => {
  it('should get weets if user is authenticated', async () => {
    const data = await getWeets(userToken);
    expect(data.statusCode).toBe(200);
    expect(data.body).toHaveProperty('weets');
  });

  it('should fail if user is not authenticated', async () => {
    const data = await getWeets(null);
    expect(data.statusCode).toBe(403);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });

  it('should get number of weets according to limit and page', async () => {
    const data = await getWeets(userToken, 1, 5);
    expect(data.statusCode).toBe(200);
    expect(data.body).toHaveProperty('weets');
    expect(data.body.weets).toHaveProperty('count');
    expect(data.body.weets).toHaveProperty('rows');
    expect(data.body.weets.rows.length).toBe(5);
  });
});
