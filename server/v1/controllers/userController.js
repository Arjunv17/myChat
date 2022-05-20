const mongoose = require('mongoose');
const Model = require('../../models');
const jwt = require('../../middleware')
const bcrypt = require('bcrypt')
const {sendMailToUser} = require('../mailler');
const { User } = require('../../models');
const Constants = require('../../constants')
// USER API

// Get API 
async function getdata(req, res) {
    let data = await Model.User.find()
    res.send(data);
    console.log(data);
}

// Post API Register
async function regitser(req, res) {
    try {
        let userEmail = await Model.User.findOne({
            email: req.body.email
        })
        let userNumber = await Model.User.findOne({
            phoneNumber: req.body.phoneNumber
        })
        let roless = ["admin", "user"]
        // let userRole = await Model.User.findOne({
        //     roless: req.body.role
        // })
        if (userEmail) {
            res.send(Constants.messages.MESSAGES.EMAIL_ALREDAY_EXIT)
        }
        else if (userNumber) {
            res.send(Constants.messages.MESSAGES.PHONE_NUMBER_ALREADY_EXISTS)
        }
        else if (!roless.includes(req.body.role)) {
            res.send(`Please select any role like ["admin" or "user"]`)
        }
        else {
            let data = await Model.User(req.body);
            let sendEmailData = await sendMailToUser(
                data.email,
                "hello this is verifed email",
                `<h1>Please click here to verify <a href="#" style="color:red">click here</a></h1>`
                )
            console.log(sendEmailData)
            let fileName = req.file.path
            Object.assign(data, { profilePic: fileName })
            console.log(fileName);
            let result = await data.save();
            res.send(result);
        }
    } catch (error) {
        res.send({
            Result: error
        })
    }
}




async function verifyUser(req,res){
    try {
        let data = await Model.User.findOne({email: req.body.email})
            if (data) {
                let result = await Model.User.updateOne({_id:data._id},{$set:{isVerified:true}})
                res.send({
                    Result:Constants.messages.MESSAGES.EMAIL_VERIFIED
                })
            }else{
                res.send({
                    Error:Constants.messages.MESSAGES.EMAIL_ID_DOES_NOT_EXISTS
                })
            }
    } catch (error) {
        res.send({
            Result:error
        })
    }
}

// // Delete API for user
// async function deleteUser(req, res) {
//     let data = await Model.User.findOne({ email: req.body.email })
//     console.log(data);
//     if (!data) {
//         res.send("User not found this type of Id")
//     } else {
//         let dataUpdate = await Model.User.updateOne({ _id: data._id }, { $set: { isDeleted: true } })
//         res.send(dataUpdate);
//     }

// }



// // Update API for user
// async function updateUser(req, res) {
//     console.log(req.params);
//     let data = await Model.User.updateOne(
//         req.params,
//         {
//             $set: req.body
//         }
//     );
//     res.send(data);
//     console.log(data);
// }


// // Login APi for user

// async function userLogin(req, res) {
//     let newEmail = req.body.email;
//     let newPassword = req.body.password;
//     let data = await Model.User.findOne({ email: newEmail, isDeleted: false })
//     if (data) {
//         let ppas = bcrypt.compareSync(newPassword, data.password)
//         if (ppas) {
//             let tokens = jwt.tokenGenrate(data.id);
//             console.log(tokens.id);
//             console.log("User Matched Success");
//             res.status(200).send({
//                 result: "User Matched Success",
//                 token: tokens
//             })
//         } else {
//             res.send("Token Not MAtch")
//         }
//     } else {
//         console.log("User Not MAtch");
//         res.status(401).send("User Not MAtch")
//     }

//     res.end()
// }

async function userLogin(req, res) {
    try {
        let emailData = await Model.User.findOne({ email: req.body.email })
        if (emailData) {
            let ppas = bcrypt.compareSync(req.body.password, emailData.password)
            if (ppas) {
                let tokens = jwt.tokenGenrate(emailData.id);
                console.log(tokens)
                res.send({
                    Result: "Login Successfully",
                    Token: tokens
                })
            } else {
                res.send({
                    Result: "Password not Match"
                })
            }
        } else {
            res.send({
                Result: " Email not Match"
            })
        }

    } catch (error) {
        res.send({
            Result: "User not Match"
        })
    }
}





module.exports = {
    regitser,
    getdata,
    //     deleteUser,
    //     updateUser,
    userLogin,
    verifyUser
}

