const Controller = require('../controllers/index');
const express = require('express');
const {verify_token,upload} = require('../../middleware')
const router = express.Router();


// Uploading Posts Routes
router.post('/commentupload',verify_token,upload, Controller.CommentController.postcomments);
router.get('/getcomments',verify_token, Controller.CommentController.getcomments);


module.exports = router;