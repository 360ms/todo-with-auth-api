const User = require('../mongodb/models/User')
const Todo = require('../mongodb/models/Todo')

const validateTodoInput = require('../validation/todo/todo.validator')

createTodo = async (req, res) => {
    const body = req.body
    const { task, userId } = body
    const { errors, isValid } = validateTodoInput(body)

    if (!isValid) {
        return res.status(400).json({
            success: false,
            msg: errors
        })
    }

    await User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: '🔍 User not found'
            })
        }

        const newTodo = new Todo({ task, userId })

        newTodo
            .save()
            .then(() => res.json({ success: false, msg: 'Todo created!' }))
            .catch(error => res.status(400).json({ success: false, msg: error.message }))
    }).catch(error => res.status(400).json({ success: false, msg: error.message }))
}

getTodos = async (req, res) => {
    const body = req.body
    const { userId } = body

    await User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: '🔍 User not found'
            })
        }

        Todo.find({ userId: user.id }).then(todo => {
            if (!todo) {
                return res.status(404).json({
                    success: false,
                    msg: '🔍 Todos not found'
                })
            }

            return res.json({
                success: true,
                data: todo
            })
        })
    }).catch(error => res.status(400).json({ success: false, msg: error.message }))
}

editTodo = async (req, res) => {
    const body = req.body
    const { id, task, userId } = body

    await User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: '🔍 User not found'
            })
        }

        Todo.findByIdAndUpdate(id).then(todo => {
            if (!todo) {
                return res.status(404).json({
                    success: false,
                    msg: '🔍 Todo not found'
                })
            }

            todo.task = task

            todo
                .save()
                .then(() => res.json({
                    success: true,
                    data: todo
                }))
                .catch(error => res.status(400).json({
                    success: true,
                    msg: error.message
                }))

        })
    }).catch(error => res.status(400).json({ success: false, msg: error.message }))
}

completeTodo = async (req, res) => {
    const body = req.body
    const { id, userId, completed = null } = body

    await User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: '🔍 User not found'
            })
        }

        Todo.findByIdAndUpdate(id).then(todo => {
            if (!todo) {
                return res.status(404).json({
                    success: false,
                    msg: '🔍 Todo not found'
                })
            }

            if (completed !== null && typeof completed === 'boolean') {
                todo.completed = completed
            }

            todo
                .save()
                .then(() => res.json({
                    success: true,
                    data: todo
                }))
                .catch(error => res.status(400).json({
                    success: true,
                    msg: error.message
                }))

        })
    }).catch(error => res.status(400).json({ success: false, msg: error.message }))
}

deleteTodo = async (req, res) => {
    const body = req.body
    const { id, userId } = body

    await User.findById(userId).then(user => {
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: '🔍 User not found'
            })
        }

        Todo.findByIdAndDelete(id)
            .then(() => res.json({ success: true, msg: 'Todo deleted!' }))
            .catch(error => res.status(400).json({ success: false, msg: error.message }))
    }).catch(error => res.status(400).json({ success: false, msg: error.message }))
}

module.exports = {
    createTodo,
    getTodos,
    editTodo,
    completeTodo,
    deleteTodo
}