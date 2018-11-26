const express = require('express');
const instance = require('./game/controller');
const path = require('path');
const app = express();

const port = 80;
const server = "localhost";
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  });

app.use("/", express.static(__dirname + "/../dist/"));
app.use('/fitnessApp', instance);
app.use("/", (req,res) => res.sendFile(path.join(__dirname + "/../dist/index.html")));
app.listen(port);
console.log(`listening on: http://${server}:${port}`);