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

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;