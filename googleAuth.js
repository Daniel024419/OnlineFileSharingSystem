const express = require('express')
const app = express()
var CLIENT_ID=process.env.CLIENT_ID_LOGIN;
var CLIENT_SECRET=process.env.CLIENT_SECRET_LOGIN;

//google auth login
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Initialize Passport and configure session support
app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: 'https://easyfiles.onrender.com/auth/google/callback' // Your redirect URI
},
(accessToken, refreshToken, profile, done) => {
    // Handle user data and authentication here
    // Typically, you would save the user's info to a database
    return done(null, profile);
}));

module.exports={
    passport : passport
}

