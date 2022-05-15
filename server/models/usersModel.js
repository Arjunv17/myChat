const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String, index: true, default: ''
    },
    email: {
        type: String, index: true, default: ''
    },
    password: {
        type: String, index: true, default: ''
    },
    isDeleted: {
        type: Boolean, index: true, default: 'false'
    }
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