const mongoose = require('mongoose');
const Model = require('../../models/index');
const jwt = require('../../middleware')
const email = require('../mailler')
const bcrypt = require('bcrypt')


// Admin API

// Get API fro admin
async function getdata(req, res) {
    let data = await Model.Admin.find()
    res.send(data);
    console.log(data);
}

// Post API fro admin
async function regitser(req, res) {
    let data = Model.Admin(req.body);
    var remail = req.body.email
    // generate salt to hash pass
    let result = await data.save();
    await email.main(remail)
    res.send(req.body);
}



// Delete API for admin
async function deleteAdmin(req, res) {
    let data = await Model.Admin.deleteOne(req.params)
    res.send(data);
}



// Update API for admin
async function updateAdmin(req, res) {
    // console.log(req.params);
    let data = await Model.Admin.updateOne(
        req.params,
        {
            $set: req.body
        }
    );
    res.send(data);
    console.log(data);
}


// Login APi for admin

async function adminLogin(req, res) {
    let newEmail = req.body.email;
    let newPassword = req.body.password;
    let data = await Model.Admin.findOne({email: newEmail})
    let ppas= bcrypt.compareSync(newPassword,data.password)
    if (ppas) {
        let tokens = jwt.tokenGenrate();
        console.log("User Matched Success");
        res.status(200).send({
            result: "User Matched Success",
            token: tokens
        })
    } else {
        console.log("User Not MAtch");
        res.status(401).send("User Not MAtch")
    }
    res.end()
}


module.exports = {
    regitser,
    getdata,
    deleteAdmin,
    updateAdmin,
    adminLogin
}

