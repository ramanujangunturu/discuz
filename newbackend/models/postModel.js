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
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        comment: {
            type: String
        }
    }]
})

module.exports = mongoose.model('Post', postSchema);