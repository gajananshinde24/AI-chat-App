// routes/authRoutes.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/', successRedirect:'http://localhost:3000/main' })
);

router.get("/login/failed", (req,res) => {
  res.status(401).json({
    error : true,
    message : "Log in failed"
  })
})

router.get("/login/success", (req,res) => {
  console.log('eeeeeeeeeeeeeeee', req.user)

  if(req.user){
    res.status(200).json({
      message : "Successfully logged In",
      user : req.user
    })

  } else {
    res.status(403).json({
      error : true,
      message : "Not authorized"
    })
  }
 
})


router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/http://localhost:3000/home');
  });
});

module.exports = router;
