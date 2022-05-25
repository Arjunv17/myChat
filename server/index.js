const express = require("express");
const connection = require("./connection/connect");
const config = require("./config/config");
const route = require("./route");
const mail = require("./v1/mailler");
const cors = require("cors");
const path = require("path");
const Model = require("./models");
const bodyParser = require("body-parser");
const { upload } = require("./middleware");
const app = express();
app.use(express.json());

// Cors fix
app.use(cors());

// EJS tempplate
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", route);

// socket
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.send("Hello Its Working");
});



// Sockets backend
var users = {};
io.on("connection", (socket) => {
    console.log("User connected");
    
    socket.on("userjoin", (data) => {
        users[data.uId] = socket.id;
        socket.broadcast.emit("new User", data.uName);
    });

    socket.on("send message", (data) => {
        Model.User.findOne({ email: data.receiver }).then((receiver) => {
            socket.to(users[receiver._id]).emit("chat message", data);
        });
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

connection
    .connect()
    .then((success) => {
        server.listen(config.port, () => {
            console.log(`Running on port ${config.port}.`);
            console.log(success);
        });
    })
    .catch((error) => {
        console.log("Db not connected!");
    });
