const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const keys = require('../config/keys');

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: keys.jwtSecret.secret,
}
const strategy = new JWTStrategy(opts, (jwt_payload, done) => {
    User.findOne({
        '_id': jwt_payload.id
    }).then(user => {
        if (user) {
            console.log('user found by _id provided in jwt')
            return done(null ,user);
        } else {
            console.log('user not found //jwt _id');
            return done(null, false);
        }
    }).catch(err => {
        console.log(err);
        return done(err);
    })
})

module.exports = strategy;