const mongoose = require('mongoose');
const Model = require('../../models/index');
const jwt = require('../../middleware')
const email = require('../mailler')
const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const { aggregate } = require('../../models/usersModel');



// Commenting API

async function postcomments(req,res) {
    let post = await Model.PostUploading.findOne({ postName: req.body.postName });
    let data = await Model.PostComments({ comments: req.body.comments, postID: post._id });
    let result = await data.save();
    res.send(result);
    res.end()
}



async function getcomments(req,res){
    let post = await Model.PostUploading.findOne({ postName: req.body.postName });
    let postandcomments = await Model.PostUploading.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(post._id) }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postID",
                as: "Comments"
            }
        },
        // {
        //     $unwind:"$Comments"
        // },
        {
            $project: {
                img: "$$ROOT.image",
                // text: "$$ROOT.text",
                // post: 
                //      {image:"$image",text:"$text"}
                //     // $mergeObjects: {image:"$post.image",text:"$post.text"}
                //     ,
                // posttext: "$post.text",
                Comments: "$Comments.comments"
            }
        },
        // {
        //     $group:{
        //         _id:"$post",
        //         postcomments:{
        //             $push:"$Comments"
        //         }
        //     }
        // }
    ])
    res.send(postandcomments);
}

module.exports = {
    postcomments,
    getcomments
}


