const Controller = require('../controllers/index');
const express = require('express');
const {verify_token,upload} = require('../../middleware')
const router = express.Router();


/*
User API'S
*/
router.post('/register',upload, Controller.UserController.regitser);
// router.get('/get', Controller.UserController.getdata);
// router.get('/getdata',verify_token, Controller.UserController.getdata);
// router.delete('/delete', Controller.UserController.deleteUser);
// router.put('/update/:_id', Controller.UserController.updateUser);
// router.post('/login', Controller.UserController.userLogin);

module.exports = router;