const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectedUsers = new Schema({
    username: {
        type: String,
        required: [true, "This field is required."],
    },
    userID: {
        type: String,
        required: [true, "This field is required."],
    }
})

module.exports = mongoose.model('connectedUsers', connectedUsers);