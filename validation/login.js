const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(input) {
    var errors = {};
    input.username = !isEmpty(input.username) ? input.username : '';
    input.password = !isEmpty(input.password) ? input.password : '';

    //Username
    if(validator.isEmpty(input.username)) {
        errors.username = 'Username required';
    };

    //Password
    if(validator.isEmpty(input.password)) {
        errors.password = 'Password required';
    };

    return {
        errors,
        isValid: isEmpty(errors)
    };
};