const supertest = require('supertest');

const app = require('../app');
const { VALIDATION_ERROR, AUTHORIZATION_ERROR, EXTERNAL_API_ERROR } = require('../app/errors');
const { weetErrorMessage } = require('../app/helpers/constants');
const { mockUser } = require('./mocks/mockUsers.js');
const { getWeet, getWeetFail, getLongWeet } = require('./mocks/mockWeets');

const request = supertest(app);
const createUser = user => request.post('/users').send(user);
const signIn = user => request.post('/users/sessions').send(user);
const createWeet = token => request.post('/weets').set('Authorization', `Bearer ${token}`);

describe('POST /weets', () => {
  it('should respond succesfully if weet is created', async () => {
    getWeet();
    await createUser(mockUser);
    const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
    const userToken = signInData.body.token;
    const data = await createWeet(userToken);
    expect(data.statusCode).toBe(201);
    expect(data.body).toHaveProperty('weetId');
  });

  it('should fail if weet exceed 140 characters', async () => {
    getLongWeet();
    await createUser(mockUser);
    const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
    const userToken = signInData.body.token;
    const data = await createWeet(userToken);
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
    expect(data.body.message).toContain(weetErrorMessage);
  });

  it('should fail if weet external api not available', async () => {
    getWeetFail();
    await createUser(mockUser);
    const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
    const userToken = signInData.body.token;
    const data = await createWeet(userToken);
    expect(data.statusCode).toBe(503);
    expect(data.body.internal_code).toContain(EXTERNAL_API_ERROR);
  });

  it('should fail if request user is not authenticated', async () => {
    const data = await createWeet(null);
    expect(data.statusCode).toBe(401);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });
});
