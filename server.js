const express = require('express')
const cors = require('cors')
const passport = require('passport')
require('./config/passport')(passport)

const userRouter = require('./routes/user.router')
const todoRouter = require('./routes/todo.router')

const app = express()
const PORT = process.env.PORT || 9000
const db = require('./mongodb/db')

app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter)
app.use('/api/todo', todoRouter)

app.listen(PORT, () => console.log(`The server has running on PORT ${PORT}`))