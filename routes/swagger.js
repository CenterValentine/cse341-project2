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

//swagger:ignore
router.get('/swagger.json', (req, res) => {
    // Create a copy so the original isn't modified
    const dynamicSwaggerDoc = { ...swaggerDocument };

    dynamicSwaggerDoc.schemes = process.env.RENDER_EXTERNAL_URL;

    dynamicSwaggerDoc.host = req.get('host');
    res.json(dynamicSwaggerDoc);
  });
  

router.use('/', swaggerUi.serve, swaggerUi.setup(null,{swaggerUrl:'/api-docs/swagger.json'}));

module.exports = router;