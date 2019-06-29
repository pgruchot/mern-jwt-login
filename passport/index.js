const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const FacebookStrategy = require('./facebookStrategy');
const JWTStrategy = require('./jwtstrategy');

passport.use(LocalStrategy);
passport.use(FacebookStrategy);
passport.use(JWTStrategy);
module.exports = passport;