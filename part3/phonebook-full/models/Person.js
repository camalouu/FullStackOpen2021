const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const personSchema = mongoose.Schema({
    name: String,
    number: Number
})

module.exports = mongoose.model('Persons', personSchema)