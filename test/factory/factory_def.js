const { factory } = require('factory-girl');
const { positionDeveloper } = require('../../app/helpers/constants');
const { hashPassword } = require('../../app/helpers/encrypt');
const { User, Weet, Rating } = require('../../app/models');

factory.define('user', User, {
  id: factory.seq('User.id'),
  firstName: factory.chance('first'),
  lastName: factory.chance('last'),
  email: factory.seq('User.email', n => `mail-${n}@wolox.co`),
  password: () => hashPassword('A123456a'),
  isAdmin: false,
  points: 4,
  position: positionDeveloper.name
});
factory.define('weet', Weet, { content: factory.chance('string'), userId: factory.assoc('user', 'id') });
factory.define('rating', Rating, {
  ratingUserId: factory.assoc('user', 'id'),
  weetId: factory.assoc('weet', 'id'),
  score: 1
});

exports.factoryCreate = async (model, values) => {
  const create = await factory.create(model, values);
  return create;
};
