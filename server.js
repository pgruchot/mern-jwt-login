const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('./passport');

//api keys
const keys = require('./config/keys.js');

//basic
const server = express();
const PORT = 5000;

//setup
server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(passport.initialize());

//routes
server.use('/auth', require('./auth'));

//db connection
mongoose.connect(keys.mongoDB.dbURI, {useNewUrlParser: true}).then(
    () => {
        console.log('Connected to database :)');
    }
).catch(err => {
    console.log('Cant connect to database :(');
    console.log(err);
});

//error handler
server.use(function(err, req, res, next) {
    console.log('-------- error --------');
    console.error(err.stack);
    res.status(500);
});

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})