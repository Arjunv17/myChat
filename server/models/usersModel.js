const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Timestamp } = require('mongodb');
const MESSAGES = require('../constants')


const userSchema = new mongoose.Schema({
    name: {
        type: String, index: true, default: ''
    },
    email: {
        type: String, index: true, default: ''
    },
    phoneNumber: {
        type: String, index: true, default: ''
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: ''
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: ''
    },
    password: {
        type: String, index: true, default: ''
    },
    profilePic: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean, index: true, default: 'false'
    },
    isVerified: {
        type: Boolean, index: true, default: 'false'
    }
},
    {
        timestamps: true
    });



userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(this.password, salt)
        this.password = hashpass
        next()
    } catch (error) {
        next(error)
    }
});




const Users = module.exports = mongoose.model('users', userSchema)
module.exports = Users;