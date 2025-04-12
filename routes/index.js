const router = require('express').Router();
const passport = require("passport");


console.log("Index routes loaded");


router.get('/', (req, res) => {
    // #swagger.tags = ['Index'] 
    res.send('API is running...')});
router.use('/users', require('./users'));
router.use('/api-docs', require('./swagger'));
router.use('/objects', require('./objects'));


router.get('/login', (req, res, next) => {
  console.log("Initiating Google login");
  passport.authenticate('google', {
      // #swagger.tags = ['System'] 
    scope: ['profile', 'email']
  })(req, res, next);
});

router.get('/logout', (req, res) => {
    // #swagger.tags = ['System'] 
    console.log("Logging out user:", req.user);
    req.logout(function(err){
        if (err){return next(err)}
            res.send('You have successfully logged out.');
        });
    });


module.exports = router;
