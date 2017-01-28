var express = require('express')
var router = express.Router()
var _ = require("lodash")
var jwt = require('jsonwebtoken')
var auth = require('../libs/auth')

// For testing
var users = [
  {
    id: 1,
    email: 'jonathanmh@test.com',
    password: '%2yx4'
  },
  {
    id: 2,
    email: 'test@test.com',
    password: 'test'
  }
]

router.get('/', function(req, res, next) {
  res.send('respond with a resource')
})

router.post('/login', function(req, res) {
  if(req.body.email && req.body.password){
    var email = req.body.email;
    var password = req.body.password;
  }

  // usually this would be a database call:
  var user = users[_.findIndex(users, { email })];
  if(!user){
    return res.status(401).json({message:"no such user found"});
  }

  if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, auth.jwtOptions.secretOrKey);
    res.json({message: "ok", token: token});
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});

module.exports = router
