const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Todo = new Schema({
    task: {
        type: String,
        required: true
    },

    createDate: {
        type: Date,
        default: Date.now()
    },

    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('todos', Todo)