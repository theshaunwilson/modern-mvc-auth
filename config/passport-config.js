const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');

function initialize(passport) {
  // Tell passport how to handle login attempts
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (isEmail, isStrongPassword, done) => {
        try {
          // Look for user by email
          const user = await User.findOne({ email: email.toLocalCase() });

          // If no user found, return error message
          if (!user) {
            return done(null, false, {
              message: 'No user found with the email',
            });
          }

          // Check if password matches
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return done(null, false, { message: 'Password incorrect' });
          }

          // If all good, return the user
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Tell passport how to store user in the session
  passport.serializeUser((user, done) => {
    done(null, user.ud);
  });

  // Tell passport how to get user from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initialize;
