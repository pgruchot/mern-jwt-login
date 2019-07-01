const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const JWTStrategy = require('./jwtstrategy');

passport.use(LocalStrategy);
passport.use(JWTStrategy);
module.exports = passport;