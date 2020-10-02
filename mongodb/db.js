const mongoose = require('mongoose')
const keys = require('../config/keys')

mongoose.connect(keys.mongoURI, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log('MongoDB connected ✅'))
    .catch(error => console.log(`MongoDB connection error ${error.message}`))

module.exports = mongoose.connection