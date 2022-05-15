const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;
const commentSchema = new mongoose.Schema({
    comments: {
        type: String, index: true, default: ''
    },
    postID: {
        type: Schema.Types.ObjectId, ref:"posts", required: true
    }
});

const PostComments = module.exports = mongoose.model('comments', commentSchema)
module.exports = PostComments