const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateSignupInput(input) {
    var errors = {};
    input.username = !isEmpty(input.username) ? input.username : '';
    input.email = !isEmpty(input.email) ? input.email : '';
    input.password = !isEmpty(input.password) ? input.password : '';
    input.password2 = !isEmpty(input.password2) ? input.password2 : '';

    //Username
    if(validator.isEmpty(input.username)) {
        errors.username = 'Username required :(';
    };

    //Email
    if(validator.isEmpty(input.email)) {
        errors.email = 'Email required :(';
    };
    if(!validator.isEmail(input.email)) {
        errors.email = 'Email invalid :(';
    };

    //Password
    if(validator.isEmpty(input.password)) {
        errors.password = 'Password field is empty :(';
    };
    if(validator.isEmpty(input.password2)) {
        errors.password2 = 'Password confirmation field is empty :(';
    };
    if(validator.isLength(input.password, { min: 6, max: 20 })) {
        errors.password = 'Password should contain 6 - 20 characters :(';
    };
    if(!validator.equals(input.password, input.password2)) {
        errors.password2 = 'Passwords should match :(';
    };
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};