const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')

router.post('/create', todoController.createTodo)
router.post('/getall', todoController.getTodos)

router.put('/edit', todoController.editTodo)
router.put('/complete', todoController.completeTodo)

router.delete('/delete', todoController.deleteTodo)

module.exports = router