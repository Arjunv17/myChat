const Controller = require('../controllers/index');
const express = require('express');
const {verify_token,upload} = require('../../middleware');
const { Template } = require('ejs');
const router = express.Router();


/*
User API'S
*/
router.post('/addContact',upload, Controller.ContactController.addContacts);
// router.post('/login', Controller.UserController.userLogin);
// router.post('/verify', Controller.UserController.verifyUser);





// EJS Template 

// router.get('/chat', Controller.UserController.chatMessage);
// router.get('/login', Controller.UserController.LoginPage);

// router.get('/get', Controller.UserController.getdata);
// router.get('/getdata',verify_token, Controller.UserController.getdata);
// router.delete('/delete', Controller.UserController.deleteUser);
// router.put('/update/:_id', Controller.UserController.updateUser);

module.exports = router;