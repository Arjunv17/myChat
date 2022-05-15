const Controller = require('../controllers/index');
const express = require('express');
const app = express();
const router =express.Router();
const {verify_token} = require('../../middleware')


/*
ADMIN API'S
*/

router.post('/register', Controller.AdminController.regitser);
router.get('/get', Controller.AdminController.getdata);
router.get('/getdata',verify_token, Controller.AdminController.getdata);
router.delete('/delete/:_id', Controller.AdminController.deleteAdmin);
router.put('/update/:_id', Controller.AdminController.updateAdmin);
router.post('/login', Controller.AdminController.adminLogin);
module.exports = router;