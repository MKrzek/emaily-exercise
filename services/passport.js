const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");
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
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
        //if we have a return above we do not need an explicit 'else' clause
      }
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);

      console.log(accessToken);
      console.log(refreshToken);
      console.log(profile);
    }
  )
);
