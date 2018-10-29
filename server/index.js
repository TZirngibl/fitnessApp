const joi = require('joi');
const express = require('express');
const instance = require('./game/controller');
const app = express();

const port = 3000;
const server = "localhost";
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/", express.static(__dirname + "/../dist/"));
app.use('/fitnessApp', instance);
app.listen(port);
console.log(`listening on: http://${server}:${port}`);