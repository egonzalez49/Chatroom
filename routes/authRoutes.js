const passport = require('passport');

module.exports = app => {
  //login route
  app.post(
    '/auth/login',
    passport.authenticate('local-login', { failWithError: true }),
    (req, res, next) => {
      req.login(req.user, function(err) {
        if (err) return next(err);
      });
      res.status(200).send(req.user);
    },
    (err, req, res, next) => {
      res.status(200).send({ loginError: 'Incorrect email or password' });
    }
  );

  //register route
  app.post(
    '/auth/register',
    passport.authenticate('local-register', { failWithError: true }),
    (req, res, next) => {
      req.login(req.user, function(err) {
        if (err) return next(err);
      });
      res.status(200).send(req.user);
    },
    (err, req, res, next) => {
      res.status(200).send({ registerError: 'Email already in use' });
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
