const mongoose = require('mongoose');
const Model = require('../../models');
const jwt = require('../../middleware')
const bcrypt = require('bcrypt')
const {sendMailToUser} = require('../mailler');
const { User } = require('../../models');
const Constants = require('../../constants')
const path = require('path')

// USER API
let breakPath = path.join(__dirname).split('v1');

// Get API 
async function addContacts(req, res) {
    const {userID,phoneNumber} = req.body;

    let contact = await Model.User.findOne({
        phoneNumber:phoneNumber
    });
    if (contact) {
        let addContact = await Model.Contact({
            userId : userID,
            contactId:contact._id
        });
        addContact.save()
        let userAndContacts = await Model.User.aggregate([
            {
                $match:{_id: mongoose.Types.ObjectId(userID)}
            },
            {
                $lookup:{
                    from: "contacts",
                    localField: "_id",
                    foreignField: "contactId",
                    as: "contacts",
                }
            },
            {
                $unwind:{

                        path: "$contacts",
                }
            }
        ])
        res.render( `${breakPath[0]}views/index`,userAndContacts[0])
    }
   
    // console.log(data);
}


module.exports = {
    addContacts
}

