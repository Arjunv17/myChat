const Controller = require('../controllers/index');
const express = require('express');
const {verify_token,upload} = require('../../middleware')
const router = express.Router();


// Uploading Posts Routes

router.post('/uploads',verify_token,upload, Controller.PostController.uploadpost);
router.get('/getbothdata',verify_token, Controller.PostController.getbothdata);
router.get('/search/:key',verify_token, Controller.PostController.getsearch);


module.exports = router;