const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");
console.log("User", User);
//user is what we pulled from the database in passport.use strategy
passport.serializeUser((user, done) => {
  //user.id is an id generated by mongo
  done(null, user.id);
});
//id comes from the cookie and then search mongo for that id
passport.deserializeUser((id, done) => {
  //search database and find user with this id and then call done with that user profile
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });

      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);
