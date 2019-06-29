const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const keys = require('../config/keys');

const strategy = new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: keys.facebook.callbackURL,
    profileURL: keys.facebook.profileURL,
    profileFields: keys.facebook.profileFields,
},(token, refreshToken, profile, done) => {
    console.log('---- facebook profile ----');
    console.log(profile);
    console.log('---- end of profile ----');

    const { id, name, photos, emails } = profile;
    //check db for id
    User.findOne({ 'facebook.facebookId' : id }, (err, userMatch) => {
        //errors
        if(err) {
            console.log('Error while looking for facebookId');
            console.log(err);
            return done(null, false);
        }
        //user found
        if(userMatch) {
            return done(null, userMatch);
        } else {
            //create user
            console.log('---- pre save ----');
            console.log(id);
            console.log(profile);
            console.log('---- post save ----');
            const newFacebookUser = new User({
                'facebook.facebookId': id,
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                photos: photos,
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
}
)

module.exports = strategy;