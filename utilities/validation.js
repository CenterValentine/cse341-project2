const {check, validationResult} = require('express-validator');
const validate = {};

validate.userValidationRules = () => {
    return [
        check('firstName').isString().isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
        check('lastName').isString().isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
        check('objectIds').isArray().withMessage('ObjectIds must be an array'),
        check('email').isEmail().withMessage('Please enter a valid email address'),
        check('birthday')
          .matches(/^\d{4}-\d{2}-\d{2}$/)
          .withMessage('Birthday must be in YYYY-MM-DD format')
          .isISO8601()
          .withMessage('Please enter a valid date'),
    ];
}

validate.userValidation = async (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};
    


validate.objectValidationRules = () => {
    return [
        check('name').isString().isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
        check('shape').isString().isLength({min: 3}).withMessage('Name must be at least 3 characters long').custom((value)=>{
            if (!value) return false;
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount = 1;
        }).withMessage('Shape must be one word'),
        check('height').isNumeric().withMessage('Height must be a number'),
        check('width').isNumeric().withMessage('Width must be a number'),
        check('unit').isString().withMessage('Weight must be a string'),
        check('color').isString().isLength({min: 3}).withMessage('Color must be at least 3 characters long'),
        check('origin').isString().isLength({min: 3}).withMessage('Origin must be at least 3 characters long'),
        // description must contain 3 words
        check('description').isString().withMessage('Description must be a string').custom((value)=>{
            if (!value) return false;
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 3;
        }).withMessage('Description must contain at least 3 words'),
    ];
}

validate.objectValidation = async (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};
    



module.exports = validate;