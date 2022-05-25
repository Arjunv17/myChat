const mongoose = require('mongoose');
const jwt= require('jsonwebtoken');
const Model = require('../v1/controllers/index');
const jwtkey="secretkey";

const multer = require("multer");
const path = require("path");

// const server = require('../index')
// const { Server } = require("socket.io");
// const io = new Server(server);


// var users={}
// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);
//     socket.on('userjoin', (name) => {
//         console.log(name);
//         users[name] = socket.id;
//         socket.broadcast.emit('new User', name);
//     });

//     socket.on('send message', (data) => {
//         console.log(data.receiver);
//         socket.to(users[data.receiver]).emit('chat message', data)
//         // socket.to(users[data.receiver]).emit('chat message', data)
//     });
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });








// Uploading Image Using Multer

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "server/upload");
        },
        filename: function (req, file, cb) {
            var fileName = file.fieldname + "-" + Date.now() + ".png";
            cb(null, fileName);
            console.log(cb);
        },
    }),
}).single("profilePic");

// JWT tokens create and verify

function tokenGenrate(id){
    var token=jwt.sign({ _id:id}, jwtkey,{expiresIn:"20 minutes"})
        console.log(token);
        return token;
}

function verify_token(req,res,next){
    var token=req.header('authorization');
    var tokenSlice=token.slice(7);

    jwt.verify(tokenSlice, jwtkey,function(err,decode){
        if (err) throw res.status(401).send("unauthorized");
        req.user_data = decode;
        next()
    })
}

module.exports={
    tokenGenrate,
    verify_token,
    upload
}