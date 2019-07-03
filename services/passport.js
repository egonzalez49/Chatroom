const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const keys = require('../config/keys');

//create cookie for user with id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//extract user from cookie's id
passport.deserializeUser((id, done) => {
  User.findById(id)
    .select({ password: false })
    .then(user => done(null, user));
});

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(email, password, done) {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }

        //email not found
        if (!user) {
          return done(null, false);
        }

        //incorrect password
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }

        //correct email/password combo
        return done(null, user);
      });
    }
  )
);

passport.use(
  'local-register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done) {
      const { firstName, lastName } = req.body;
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }

        //email already in db
        if (user) {
          return done(null, false);
        }
        //new user creation
        const newUser = new User({
          email,
          firstName,
          lastName,
          avatar: keys.defaultAvatar
        });
        newUser.password = User.encryptPassword(password);

        newUser.save(err => {
          if (err) {
            throw err;
          }

          return done(null, newUser);
        });
      });
    }
  )
);
