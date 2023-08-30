const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postedBy: {
        type: String,
        required: [true, "This field is required."],
    },
    title: {
        type: String,
        required: [true, "This field is required."],
    },
    content: {
        type: String,
        required: [true, "This field is required."],
    },
    comments: [{
        username: {
            type: String,
        },
        comment: {
            type: String
        }
    }]
})

module.exports = mongoose.model('Post', postSchema);