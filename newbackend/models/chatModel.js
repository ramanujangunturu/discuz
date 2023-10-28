const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chats = new Schema({
    user1: {
        type: String,
        required: [true, "This field is required."],
    },
    user2: {
        type: String,
        required: [true, "This field is required."],
    },
    chats:[{
        sender: {
            type: String,
            required: [true, "This field is required."],
        },
        message: {
            type: String,
            required: [true, "This field is required."],
        }
    }]
})

module.exports = mongoose.model('chats', chats);