var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var uid2 = require('uid2');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var GOOGLE_CLIENT_ID = "287459507572-fuf77ilmfdgqn1954bdor8ktt84uvpcu.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "7m3U08E4c--l3RJiykiO22rN";
var GOOGLE_CALLBACK_URL = "http://localhost:3000/oauth2callback"


passport.use(new GoogleStrategy({  
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      // console.log(profile)
      console.log("GoogleStrategy done callback?")
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

passport.serializeUser(function(user, done) {  
    console.log("serlializing user");
    done(null, user);
});

passport.deserializeUser(function(user, callback){
       console.log('deserialize user.');
       callback(null, user);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  genid: function(req) {
    return 'whatever'; //uid2(32) // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))

app.use(passport.initialize());
app.use(passport.session());




var router = express.Router();
router.get('/', function(req, res, next) {
  res.send('Welcome! <a href="/auth/google"> Login with Google </a>')
});


//login success route
router.get('/login_success', function(req, res){
  res.send('login succeedz!');
});

//login fail route
router.get('/login_fail', function(req, res){
  res.send('login failed!');
});

//authenticate
router.get('/auth/google', passport.authenticate('google',  
    { scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'] }),
    function(req, res){} // this never gets called
);

//redirect after authenticate
router.get('/oauth2callback',
  passport.authenticate('google', { failureRedirect: '/login_fail'}),
  function(req, res) {
    res.redirect('/api');
  }
);

router.get('/api',  
    ensureAuthenticated,
    function(req, res) {
        //console.log(req.user)
        res.send('Hooray! welcome to our api!');
    }
); 

app.use('/', router);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


function ensureAuthenticated(req, res, next) {  
    if (req.isAuthenticated()) { return next(); }
    res.sendStatus(401);
}

module.exports = app;
