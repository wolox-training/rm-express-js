const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getUsers, adminUser } = require('./controllers/users');
const { weet, getWeets, rateWeets } = require('./controllers/weets');
const { validateDto } = require('../app/middlewares/validate-dto');
const { validateToken } = require('./middlewares/validateToken');
const userSchema = require('../app/helpers/ajv-schemas/user');
const signInSchema = require('../app/helpers/ajv-schemas/signIn');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateDto(userSchema)], signUp);
  app.post('/users/sessions', [validateDto(signInSchema)], signIn);
  app.get('/users', [validateToken], getUsers);
  app.post('/admin/users', [validateToken, validateDto(userSchema)], adminUser);
  app.post('/weets', [validateToken], weet);
  app.get('/weets', [validateToken], getWeets);
  app.post('/weets/:id/ratings', [validateToken], rateWeets);
};
