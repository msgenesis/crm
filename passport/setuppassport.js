const passport = require("passport");
const User = require("../models/User");
const localStrategy = require("passport-local").Strategy;
module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  passport.use(
    "local-login",
    new localStrategy({ passReqToCallback: true }, function(
      req,
      username,
      password,
      done
    ) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "No user has that username" });
        }
        console.log(password)
        user.checkPassword(password, function(err, isMatch) {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Username or password is incorrect"
            });
          }
        });
      });
    })
  );
};
