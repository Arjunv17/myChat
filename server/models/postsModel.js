const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;
const postSchema = new mongoose.Schema({
    text: {
        type: String, index: true, default: ''
    },
    image: {
        type: String, index: true, default: ''
    },
    postName: {
        type: String, index: true, default: '', unique:true
    },
    userID: {
        type: Schema.Types.ObjectId, ref:"users", required: true
    }
});

const PostUploading = module.exports = mongoose.model('posts', postSchema)
module.exports = PostUploading