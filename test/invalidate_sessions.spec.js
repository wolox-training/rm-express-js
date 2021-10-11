const supertest = require('supertest');

const app = require('../app');
const { factoryCreate } = require('./factory/factory_def');
const { AUTHORIZATION_ERROR } = require('../app/errors');
const { mockUser } = require('./mocks/mockUsers.js');
const { sessionClosedMessage } = require('../app/helpers/constants');

const request = supertest(app);

const invalidateAllSessions = token =>
  request.post('/users/sessions/invalidate_all').set('Authorization', `Bearer ${token}`);
const signIn = user => request.post('/users/sessions').send(user);

beforeEach(async done => {
  await factoryCreate('user', {
    id: 2,
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email
  });
  done();
});

describe('POST /users/sessions/invalidate_all', () => {
  it('should respond succesfully if user is authenticated', async () => {
    const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
    const userToken = signInData.body.token;
    const data = await invalidateAllSessions(userToken);
    expect(data.statusCode).toBe(200);
    expect(data.body).toHaveProperty('message');
    expect(data.body.message).toContain(sessionClosedMessage);
  });

  it('should fail if user is not authenticated', async () => {
    const data = await invalidateAllSessions(null);
    expect(data.statusCode).toBe(403);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });

  it('should fail if the user has previously closed session', async () => {
    const signInData = await signIn({ email: mockUser.email, password: mockUser.password });
    const userToken = signInData.body.token;
    await invalidateAllSessions(userToken);
    const data = await invalidateAllSessions(userToken);
    expect(data.statusCode).toBe(403);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });
});
