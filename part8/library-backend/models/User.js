const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    favoriteGenre: {
        type: String,
        required: true
    }
})

schema.plugin(mongooseUniqueValidator)
module.exports = mongoose.model('User', schema)