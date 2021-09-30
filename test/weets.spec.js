const supertest = require('supertest');

const app = require('../app');
const { AUTHORIZATION_ERROR } = require('../app/errors');
const { mockUser } = require('./mocks/mockUsers.js');
// const { getLongWeet } = require('./mocks/mockWeets');

const request = supertest(app);
const createUser = user => request.post('/users').send(user);
const signIn = user => request.post('/users/sessions').send(user);
const createWeet = token => request.post('/weets').set('Authorization', `Bearer ${token}`);

// const logger = require('../app/logger');

let userToken = null;
beforeAll(async () => {
  await createUser(mockUser);
  const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
  userToken = signInData.body.token;
});

describe('POST /weets', () => {
  it('should respond succesfully if weet is created', async () => {
    // getLongWeet();
    await createUser(mockUser);
    const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
    userToken = signInData.body.token;
    const data = await createWeet(userToken);
    expect(data.statusCode).toBe(201);
    expect(data.body).toHaveProperty('weetId');
  });

  it('should fail if request user is not authenticated', async () => {
    const data = await createWeet(null);
    expect(data.statusCode).toBe(401);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });
});
