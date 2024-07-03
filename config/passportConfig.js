const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3003/auth/google/callback",
    scope: ['profile', 'email']
  },
  async(accessToken, refreshToken, profile, done) => {
    // Here you can save the profile information to your database or session
    try {
      let user = await User.findOne({googleId:profile.id});
      console.log("user", profile)
      console.log('profile.id', profile.id)

      if(!user){
          user = new User({
              googleId:profile.id,
              name:profile.displayName,
              email:profile.emails[0].value,
          });

          await user.save();
      }

      return done(null,user)
  } catch (error) {
      return done(error,null)
  }
    done(null, profile);
  }
));

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user information from the session

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
})