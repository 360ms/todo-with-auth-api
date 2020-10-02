const Validator = require('validator')
const isEmpty = require('is-empty')

const validateTodoInput = data => {
    const errors = {}
    let { task } = data

    task = isEmpty(task) ? '' : task

    if (Validator.isEmpty(task)) {
        errors.task = 'Task field is required!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateTodoInput