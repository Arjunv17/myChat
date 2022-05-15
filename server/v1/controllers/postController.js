const mongoose = require('mongoose');
const Model = require('../../models/index');
const jwt = require('../../middleware')
const email = require('../mailler')
const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const { aggregate } = require('../../models/usersModel');


// Posting API

async function uploadpost(req,res) {
    let postexist = await Model.PostUploading.findOne({postName:req.body.postName});
    if (postexist) {
        res.send("choose another post name");
        res.end();
    } else {
        let data = Model.PostUploading(req.body);
        var filename = req.file.path;
        var obj = data;
        var rt = req.user_data;
        Object.assign(obj, { image: filename, userID: rt });
        let result = await data.save(obj);
        res.send(result);
        res.end()
    }
}

async function getsearch(req,res){
    console.log("hello",req.params.key);
    let data = await Model.PostUploading.find(
        {
            "$or":[
                {"postName":{$regex:req.params.key}}
            
            ]
        }
    );
    res.send(data)
}


async function getbothdata(req, res) {
    var rt = req.user_data;


    // Populate data in mongoose method
    // var pops = [
    //     { path: 'userID', model: 'users', select: 'name email' }
    // ];
    // Model.PostUploading.findOne({userID:rt}).populate(pops).exec((err, docs) => {
    //     if (err) throw (err);
    //     res.send(docs)
    // })


    // Aggregate in mongoose method
    // let match = {
    //     $match: {
    //         userID:mongoose.Types.ObjectId(rt._id)
    //     }
    // }
    //    let data = await Model.PostUploading.aggregate([match]);



    // Lookup in Mongoose
    let data = await Model.PostUploading.aggregate([
        {
            $match: {
                userID: mongoose.Types.ObjectId(rt)
            }

        },
        {
            $lookup: {
                from: 'users',
                localField: 'userID',
                foreignField: '_id',
                as: 'usersdata'
            },
        },
        {
            $unwind: "$usersdata",
        },
        {
            $project: {
                userName: "$usersdata.name",
                useremail: "$usersdata.email",
                postimg: "$image",
                posttext: "$text",
            }
        }

    ]).then((data) => {
        console.log(data);
        res.send(data)
    })
        .catch((error) => {
            console.log(error);
        });
}


module.exports = {
    uploadpost,
    getbothdata,
    getsearch
}
