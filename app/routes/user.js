const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = mongoose.model('User');
const router = express.Router();


router.post('/register', function(req, res, next) {
  
  User.userCheck(req.body.username, function(err, user){
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({
        error: 'user exists'
      })
    } 

    let newUser = new User(req.body)
    

    // Save user
    newUser.save().then(function(user) {
      let token = jwt.sign({id: user._id}, 'shhhhhhared-secret', {
        expiresIn : 60 * 3
      });
      return res.json({
        success: true,
        user,
        token
      })
    })
  })


});

router.post('/login', function(req, res, next) {
  
  User.userCheck(req.body.username, function(err, user){
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        success: false,
        message: 'Unknown user'
      })
    } 

    if (!user.authenticate(req.body.password)) {
      return res.json({
        success: false,
        message: 'Invalid password'
      })
    }

    let token = jwt.sign({id: user._id}, 'shhhhhhared-secret', {
      expiresIn : 60 * 3
    });
    return res.json({
      success: true,
      user,
      token
    })
    

  })

});


module.exports = router;
