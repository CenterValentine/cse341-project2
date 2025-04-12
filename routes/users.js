const express = require('express');
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../utilities/isAuthenticated");
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
    isAuthenticated,
    validation.userValidationRules(),
    validation.userValidation,
    userController.createUser);

router.put('/:id', 
    // #swagger.tags = ['Users']
    isAuthenticated,
    validation.userValidationRules(), 
    validation.userValidation, 
    userController.updateUser);

router.delete('/:id', 
    isAuthenticated,
    // #swagger.tags = ['Users']
    userController.deleteUser);

module.exports = router;