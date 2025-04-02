const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Users and Objects API',
    description: 'An API for managing users and objects',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, endpointsFiles, doc);