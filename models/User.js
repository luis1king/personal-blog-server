const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
   active: {
        type: Boolean,
    },
    role: {
        type: String,
    },
    avatar: {
        type: String,
    }
});


module.exports = model('User', UserSchema );

