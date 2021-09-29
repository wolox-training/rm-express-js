const config = require('../config');
const schemas = require('./schemas');
const paths = require('./paths');

const port = config.common.api.port || 8080;

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '0.1.0',
    title: 'Witter API',
    description: 'WTraining',
    termsOfService: '',
    contact: {
      name: 'Wolox',
      email: 'ricardo.a.moreno@wolox.co',
      url: 'https://www.wolox.com.ar/'
    },
    license: {
      name: 'MIT'
    }
  },
  servers: [
    {
      url: `http://localhost:${port}/`,
      description: 'Local server'
    },
    {
      url: 'https://api_url_testing',
      description: 'Testing server'
    }
  ],
  security: [],
  tags: [
    {
      name: 'CRUD operations'
    }
  ],
  paths,
  components: {
    schemas,
    securitySchemes: {}
  }
};
