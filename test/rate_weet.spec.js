const jwt = require('jwt-simple');
const supertest = require('supertest');
const { factory } = require('factory-girl');
const { User, Weet, Rating } = require('../app/models');
const app = require('../app');
const { mockUserVerified, mockUser, mockUserDeveloper } = require('./mocks/mockUsers.js');
const { VALIDATION_ERROR, AUTHORIZATION_ERROR } = require('../app/errors');

const verify = jest.spyOn(jwt, 'decode');
const request = supertest(app);
factory.define('user', User, {});
factory.define('weet', Weet, { content: 'loremIpsum', userId: factory.assoc('user', 'id') });
factory.define('rating', Rating, {
  ratingUserId: factory.assoc('user', 'id'),
  weetId: factory.assoc('weet', 'id'),
  score: 1
});

beforeEach(async done => {
  verify.mockImplementation(token => (token === 'fail' ? token : { payload: { ...mockUserVerified } }));
  await factory.create('user', { id: 1, ...mockUser });
  const userDeveloper = await factory.create('user', {
    id: 2,
    ...mockUserDeveloper
  });

  await factory.create('weet', { id: 1, userId: userDeveloper.id });
  done();
});
const getUserById = id => User.findOne({ where: { id } });
const createRateWeet = (token, weetId, body) =>
  request
    .post(`/weets/${weetId}/ratings`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);

describe('POST /weets/:id/ratings', () => {
  it('should respond succesfully if rate weet is created', async () => {
    const data = await createRateWeet('abc', 1, { ratingUserId: 1, score: 1 });
    expect(data.statusCode).toBe(200);
    expect(data.body).toHaveProperty('id', 'score', 'ratingUserId', 'weetId');
  });

  it('should fail if user is not authenticated', async () => {
    const data = await createRateWeet('fail', 1, { ratingUserId: 1, score: 2 });
    expect(data.statusCode).toBe(403);
    expect(data.body.internal_code).toContain(AUTHORIZATION_ERROR);
  });

  it('should fail if score is diferent of 1 or -1', async () => {
    const data = await createRateWeet('abc', 1, { ratingUserId: 1, score: 2 });
    expect(data.statusCode).toBe(400);
    expect(data.body.internal_code).toContain(VALIDATION_ERROR);
  });

  it('should update the score if the user has previously rated the weet whit diferent value', async () => {
    const previousData = await createRateWeet('abc', 1, { ratingUserId: 1, score: 1 });
    const currentData = await createRateWeet('abc', 1, { ratingUserId: 1, score: -1 });
    expect(currentData.statusCode).toBe(200);
    expect(currentData.body).toHaveProperty('id', 'score', 'ratingUserId', 'weetId');
    expect(currentData.body.id).toBe(previousData.body.id);
    expect(currentData.body.score).not.toBe(previousData.body.score);
  });

  it('It should not change if the user previously rated the weet with the same score', async () => {
    const previousData = await createRateWeet('abc', 1, { ratingUserId: 1, score: 1 });
    const currentData = await createRateWeet('abc', 1, { ratingUserId: 1, score: 1 });
    expect(currentData.statusCode).toBe(200);
    expect(currentData.body).toHaveProperty('id', 'score', 'ratingUserId', 'weetId');
    expect(currentData.body).toEqual(previousData.body);
  });

  it('should decrement the users points after negative rating his weet', async () => {
    const userBefore = await getUserById(2);
    const data = await createRateWeet('abc', 1, { ratingUserId: 1, score: -1 });
    const userAfter = await getUserById(2);
    expect(data.statusCode).toBe(200);
    expect(userAfter.points).toEqual(userBefore.points - 1);
  });

  it('should increment the users points after positively rating his weet', async () => {
    const userBefore = await getUserById(2);
    const data = await createRateWeet('abc', 1, { ratingUserId: 1, score: 1 });
    const userAfter = await getUserById(2);
    expect(data.statusCode).toBe(200);
    expect(userAfter.points).toEqual(userBefore.points + 1);
  });

  it('should change user position according to points obtained after rate his weet', async () => {
    const userBefore = await getUserById(2);
    const data = await createRateWeet('abc', 1, { ratingUserId: 1, score: 1 });
    const userAfter = await getUserById(2);
    expect(data.statusCode).toBe(200);
    expect(data.body).toHaveProperty('id', 'score', 'ratingUserId', 'weetId');
    expect(userBefore.position).toEqual('Developer');
    expect(userAfter.position).toEqual('Lead');
  });
});
