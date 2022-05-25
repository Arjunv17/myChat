const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Timestamp } = require('mongodb');
const MESSAGES = require('../constants')


const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,ref:'users', required:true
    },
    contactId: {
        type: mongoose.Types.ObjectId,ref:'users', required:true
    },
    isDeleted: {
        type: Boolean, index: true, default: 'false'
    },
    isBlocked: {
        type: Boolean, index: true, default: 'false'
    }
},
    {
        timestamps: true
    });

const Contact = module.exports = mongoose.model('contacts', contactSchema)
module.exports = Contact;