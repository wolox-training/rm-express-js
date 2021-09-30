const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getUsers } = require('./controllers/users');
const { validateDto } = require('../app/middlewares/validate-dto');
const { validateToken } = require('./middlewares/validateToken');
const userSchema = require('../app/helpers/ajv-schemas/user');
const signInSchema = require('../app/helpers/ajv-schemas/signIn');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateDto(userSchema)], signUp);
  app.post('/users/sessions', [validateDto(signInSchema)], signIn);
  app.get('/users', [validateToken], getUsers);
};
