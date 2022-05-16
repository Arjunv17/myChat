const express = require('express');
const connection = require('./connection/connect');
const config = require('./config/config');
const route = require('./route');
const mail = require('./v1/mailler')
const cors = require('cors')
const path = require('path')

const {upload} =require('./middleware')
const app = express();
app.use(express.json())

app.use(cors())


app.use('/api', route);
const server = require('http').createServer(app);
// const io = require('socket.io')(server)
// app.use('/static', express.static(path.join(__dirname, '../backend/uploads/')));

app.get("/", (req, res) => {
    res.send('Hello Its Working')
});


connection.connect().then(success => {
    server.listen(config.port, () => {
        console.log(`Running on port ${config.port}.`);
        console.log(success);
    });
}).catch(error => {
    console.log('Db not connected!')
});

