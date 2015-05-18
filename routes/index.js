
var express = require('express');
var router = express.Router();
//var passport = require('passport')

/* GET home page. 
//home page
router.get('/', function(req, res, next) {
  res.send('Welcome!')
  console.log(req.user)
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
    { scope: ['https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'] }),
    function(req, res){} // this never gets called
);

//redirect after authenticate
router.get('/oauth2callback',
  passport.authenticate('google', { failureRedirect: '/login_fail'}),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/api',  
    //ensureAuthenticated,
    function(req, res) {
        console.log(res['headers'])
        res.render('index', { user: req.user });
        //res.send('Hooray! welcome to our api!');
    }
); 

function ensureAuthenticated(req, res, next) {  
    //console.log(req)
    //console.log(req['user'])
    if (req.isAuthenticated()) {
      return next();
    }
    res.sendStatus(401);
};
*/
module.exports = router;
