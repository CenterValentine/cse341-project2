const express = require('express');
const router = express.Router();
const validation = require('../utilities/validation');
const utilities = require('../utilities/index.js');

const userController = require('../controllers/userController');

router.get('/',
    // #swagger.tags = ['Users']
    userController.getAll);

router.get('/:id', 
    // #swagger.tags = ['Users']
    userController.getUser);

router.post('/',
    // #swagger.tags = ['Users']
    // validation.userValidationRules(), 
    // validation.userValdiation, 
    userController.createUser);

router.put('/:id', 
    // #swagger.tags = ['Users']
    // validation.userValidationRules(), 
    // validation.userValdiation, 
    userController.updateUser);

router.delete('/:id', 
    // #swagger.tags = ['Users']
    userController.deleteUser);

module.exports = router;