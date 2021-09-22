// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', signUp);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
