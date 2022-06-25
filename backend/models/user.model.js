// Imports
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Schéma User
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})


// plugin mongoose creation de valeurs unique
userSchema.plugin(uniqueValidator)

// Export
module.exports = mongoose.model('User', userSchema)