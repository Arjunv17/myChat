const express = require('express');
const Routes= require('./Routes/index');
const router = express();

router.use('/user',Routes.UserRoutes);


module.exports=router;



// For Using Sessions storage

// const session = require('express-session')
// router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// req.session.login_data = decode;

// var rt= req.session.login_data;