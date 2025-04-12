const express = require('express');
const router = express.Router();
const validation = require('../utilities/validation');
const utilities = require('../utilities/index.js');
const isAuthenticated = require("../utilities/isAuthenticated");

const objectsController = require('../controllers/objectsController');

router.get('/', 
    // #swagger.tags = ['Objects'] 
    objectsController.getAll);

router.get('/:id', 
    // #swagger.tags = ['Objects'] 
    objectsController.getObject);

router.post('/',
    // #swagger.tags = ['Objects'] 
    isAuthenticated,
    validation.objectValidationRules(), 
    validation.objectValidation, 
    objectsController.createObject);

router.put('/:id', 
    // #swagger.tags = ['Objects'] 
    isAuthenticated,
    validation.objectValidationRules(), 
    validation.objectValidation, 
    objectsController.updateObject);

router.delete('/:id', 
    // #swagger.tags = ['Objects'] 
    isAuthenticated,
    objectsController.deleteObject);

module.exports = router;