const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
// const swaggerRoutes = require('./swagger');

router.use('/', (req, res, next) => {
    console.log('request', req.body);
    console.log('request', req.headers);
console.log('swaggerDocument', swaggerDocument);
console.log('swaggerUi', swaggerUi);
next();
});

router.get('/swagger.json', (req, res) => {
    // Create a copy so the original isn't modified
    const dynamicSwaggerDoc = { ...swaggerDocument };
    // Update the host based on the incoming request's host header
    dynamicSwaggerDoc.host = req.get('host');
    res.json(dynamicSwaggerDoc);
  });
  

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;