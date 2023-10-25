//how to create a model's schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "This field is required."],
        lowercase: true,
    },
    username: {
        type: String,
        required: [true, "This field is required."],
        unique: [true, "Username {VALUE} is already taken"]
    },
    email: {
        type: String,
        required: [true, "This field is required."],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "This field is required."],
    },
    friends: [{
        username: {
            type: String,
        }
    }]

});

module.exports = mongoose.model('User', userSchema);
