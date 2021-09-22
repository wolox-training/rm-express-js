const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/users');
const validateDto = require('../app/middlewares/validate-dto');
const userSchema = require('../app/helpers/ajv-schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateDto(userSchema), signUp);
};
