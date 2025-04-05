const express = require('express');
const router = express.Router();
const validation = require('../utilities/validation');
const utilities = require('../utilities/index.js');

const objectsController = require('../controllers/objectsController');

router.get('/', 
    // #swagger.tags = ['Objects'] 
    objectsController.getAll);

router.get('/:id', 
    // #swagger.tags = ['Objects'] 
    objectsController.getObject);

router.post('/',
    // #swagger.tags = ['Objects'] 
    validation.objectValidationRules(), 
    validation.objectValidation, 
    objectsController.createObject);

router.put('/:id', 
    // #swagger.tags = ['Objects'] 
    validation.objectValidationRules(), 
    validation.objectValidation, 
    objectsController.updateObject);

router.delete('/:id', 
    // #swagger.tags = ['Objects'] 
    objectsController.deleteObject);

module.exports = router;