const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("Users");

passport.serializeUser((user, done) => {
  // user is the data we want to store on session (here, just the id)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // user is the data we want to restore from the session (here, just the id)
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (existingUser) {
        //User Already exists
        done(null, existingUser);
      } 
        //Create new user
        const user = await new User({ googleID: profile.id }).save()
        done(null, user);
    }
  )
);
