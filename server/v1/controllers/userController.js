const mongoose = require('mongoose');
const Model = require('../../models');
const jwt = require('../../middleware')
const bcrypt = require('bcrypt')
const email = require('../mailler')
// USER API

// Get API 
async function getdata(req, res) {
    let data = await Model.User.find()
    res.send(data);
    console.log(data);
}

// Post API Register
async function regitser(req, res) {
    let data = Model.User(req.body);
    var remail = req.body.email
    var loginid = data.id
    let result = await data.save();
    await email.main(remail)
    res.send(req.body);
}

// Delete API for user
async function deleteUser(req, res) {
    let data = await Model.User.findOne({ email: req.body.email })
    console.log(data);
    if (!data) {
        res.send("User not found this type of Id")
    } else {
        let dataUpdate = await Model.User.updateOne({ _id: data._id }, { $set: { isDeleted: true } })
        res.send(dataUpdate);
    }

}



// Update API for user
async function updateUser(req, res) {
    console.log(req.params);
    let data = await Model.User.updateOne(
        req.params,
        {
            $set: req.body
        }
    );
    res.send(data);
    console.log(data);
}


// Login APi for user

async function userLogin(req, res) {
    let newEmail = req.body.email;
    let newPassword = req.body.password;
    let data = await Model.User.findOne({ email: newEmail, isDeleted: false })
    if (data) {
        let ppas = bcrypt.compareSync(newPassword, data.password)
        if (ppas) {
            let tokens = jwt.tokenGenrate(data.id);
            console.log(tokens.id);
            console.log("User Matched Success");
            res.status(200).send({
                result: "User Matched Success",
                token: tokens
            })
        } else {
            res.send("Token Not MAtch")
        }
    } else {
        console.log("User Not MAtch");
        res.status(401).send("User Not MAtch")
    }

    res.end()
}




module.exports = {
    regitser,
    getdata,
    deleteUser,
    updateUser,
    userLogin
}

