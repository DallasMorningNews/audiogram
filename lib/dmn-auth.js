var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy;


/*
 * Setup a new Google Oauth strategy
 */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://dmn-audiogram.herokuapp.com/login/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


/*
 * Initialize all the required components for session persistence and add
 * the login routes for our @dallasnews.com Google auth
 */
module.exports = function(app) {
  // Use Express's session store for in-memory session management via cookies
  app.use(require('cookie-parser')());
  app.use(require('express-session')({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
  }));

  // Start passport now that our session has been kicked off by Express
  app.use(passport.initialize());
  app.use(passport.session());

  // A login route that has our dallasnews.com domain whitelisted
  app.get('/login', passport.authenticate(
      'google', {
        hd: 'dallasnews.com',
        prompt: 'select_account',
        scope: ['profile']
      }
    ));

  // Route to complete the Oauth handshake
  app.get('/login/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    res.redirect('/');
  });

  // Lastly, a middleware to sit in front of all request to ensure that all
  // routes after this require auth
  app.use('*', function(req, res, cb) {
    if (req.isAuthenticated()) {
      cb();
      return;
    }

    res.redirect('/login');
  });
}
