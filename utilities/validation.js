const {check, validationResult} = require('express-validator');
const validate = {};

validate.userValidationRules = () => {
    return [
        check('name').isString().isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
        check('email').isEmail().withMessage('Please enter a valid email address'),
        check('phone').isString().isLength({min: 10, max: 10}).withMessage('Phone number must be 10 characters long'),
        check('address').isString().isLength({min: 3}).withMessage('Address must be at least 3 characters long'),
    ];
}

validate.userValidation = async (req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
};
    


module.exports = validate;