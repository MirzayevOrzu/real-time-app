const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

passport.serializeUser(function (user, done) {
  console.log("serialize user ", user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("deserialize user ", user);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/user/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("google progfile ", profile);
      User.findOrCreate(profile, function (err, user) {
        return done(err, user);
      });
    }
  )
);
