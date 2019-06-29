const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    (username, password, done) => {
        //db search
        User.findOne({ 'local.username': username }, (err, userMatch) => {
            if(err) {
                //search error
                return done({ db: `Error occured: ${err}`});
            };
            if(!userMatch) {
                //username not found
                return done(null, false, { username: 'Incorrect username' });
            };
            if(!userMatch.checkPassword(password, userMatch.local.password)) {
                //password incorrect
                return done(null, false, { password: 'Incorrect password' });
            };
            //return user if everything works
            return done(null, userMatch);
        })
    }
)

module.exports = strategy;