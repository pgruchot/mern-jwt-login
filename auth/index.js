const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../passport');
const jwt = require('jsonwebtoken');
const validateSignupInput = require('../validation/signup');
const validateLoginInput = require('../validation/login');
const keys = require('../config/keys');

//passport routes for Oauth providers, react href get requests
router.post('/facebook', (req, res) => {
    console.log(req.data);
    const { id, first_name, last_name, picture, email } = req.body.data;
    User.findOne({ 'facebook.facebookId' : id }, (err, userMatch) => {
        //errors
        if(err) {
            console.log('Error while looking for facebookId');
            console.log(err);
            return res.json({
                'errors': {db: `Error while saving the user to database: ${err}`}
            });
        }
        //user found
        if(userMatch) {
            const token = jwt.sign({ id: userMatch._id }, keys.jwtSecret.secret);
            return res.json({ token: token });
        } else {
            const newFacebookUser = new User({
                'facebook.facebookId': id,
                email: email,
                firstName: first_name,
                lastName: last_name,
                picture: picture.data.url,
            });
            //save to db
            newFacebookUser.save((err, savedUser) => {
                if(err) {
                    console.log('Error while saving facebook user');
                    console.log(err);
                    return done(null, false);
                } else {
                    return done(null, savedUser);
                };
            });
        };
    });
});


//get user data route if authenticated
router.get('/user', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if(err) {
            return res.json({ user: null });
        }
        if (!user) {
            return res.json({'errors': info});
        }
        console.log('user found by jwt');
        const userToProcess = JSON.parse(JSON.stringify(user));
        const cleanUser = Object.assign({}, userToProcess);
        if(cleanUser.local) {
            delete cleanUser.local.password;
        }
        return res.json({ user: cleanUser });
    })(req, res, next);
});

router.post('/login', (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);
    console.log(isValid);
    if(!isValid) {
        return res.json({'errors': errors});
    } else {
        return next();
    }

} ,function(req, res, next) {
    passport.authenticate('local', { session: false }, function(err, user, info) {
        console.log('asdasds')
        if (err) {
        return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (!user) {
        return res.json({'errors': info});
        }
        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        User.findOne({ '_id': user._id })
            .then(user => {
                console.log('hete');
                const token = jwt.sign({ id: user._id }, keys.jwtSecret.secret);
                return res.json({ token: token });
            }).catch(err => {
                console.log('error in login findone jwt');
                return null;
            })     
    })(req, res, next);
    });

//passport local signup route
router.post('/signup', (req, res) => {
    const { username, email, password, password2 } = req.body;
    //validation needed here
    const { errors, isValid } = validateSignupInput(req.body);
    if(!isValid) {
        return res.json({'errors': errors});
    }
    //check db for duplicate email or username
    User.findOne({'local.username': username}, (err, userMatch) => {
        if(userMatch) {
            return res.json({
                'errors': {username: `Username ${username} duplicate`}
            });
        }
        //everything k, create user
        else {
            let newUser = new User();
                newUser.local.username = username;
                newUser.local.password = newUser.hashPassword(password);
                newUser.email = email;

            //save user with assigned properties
            newUser.save((err) => {
                if (err) {
                    //db errors react handler
                    return res.json({
                        'errors': {db: `Error while saving the user to database: ${err}`}
                    });
                } else {
                    //cleanup for react redirect
                    return res.json({
                        'errors': ''
                    });
                }
            });
        }
    });
})
module.exports = router;