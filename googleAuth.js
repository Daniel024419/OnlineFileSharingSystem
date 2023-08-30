
var CLIENT_ID=process.env.CLIENT_ID_LOGIN;
var CLIENT_SECRET=process.env.CLIENT_SECRET_LOGIN;
   
const dotenv = require("dotenv");
dotenv.config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL:"http://localhost:3030/auth/callback",
    passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

