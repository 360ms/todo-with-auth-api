const Validator = require('validator')
const isEmpty = require('is-empty')

const validateRegisterInput = data => {
    const errors = {}
    let { name, email, password } = data

    name = isEmpty(name) ? '' : name
    email = isEmpty(email) ? '' : email
    password = isEmpty(password) ? '' : password

    if (Validator.isEmpty(name)) {
        errors.name = 'Name field is required!'
    }

    if (Validator.isEmpty(email)) {
        errors.email = 'Email field is required!'
    } else if (!Validator.isEmail(email)) {
        errors.email = 'Email is invalid!'
    }

    if (Validator.isEmpty(password)) {
        errors.password = 'Password field is required!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput