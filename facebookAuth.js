var CLIENT_ID_FB=process.env.CLIENT_ID_LOGIN_FB;
var CLIENT_SECRET_FB=process.env.CLIENT_SECRET_LOGIN_FB;

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require("dotenv");
dotenv.config();

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
 
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: CLIENT_ID_FB,
    clientSecret: CLIENT_SECRET_FB,
    callbackURL: "http://localhost:3030/auth/facebook/callback",
    passReqToCallback: true,
}, function (req, accessToken, refreshToken, profile, done) {
    console.log("Facebook Auth Callback:", profile);
    // Your authentication logic here
}));
