var express = require('express');
var router = express.Router();
let request = require("async-request");
var userModel = require('../models/users')

var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Sign in */
router.get('/sign-in',async function(req, res, next) {

  var isUserExist = false;

  console.log('email from front',req.query)

  // All the user from the database with the email from the front will be stored in data
  const user = await userModel.findOne({
    email:req.query.email
  })

  // We are checking it there is a user or not 
  if(!user){
    res.json({ result: true, isUserExist: false, status: 'no user ondb' });

  } else {
    var hash = SHA256(req.query.password + user.salt).toString(encBase64);
    if (hash === user.password) {
      res.json({ result: true, isUserExist: true });
    } else {
      res.json({ result: true, isUserExist: false, status : 'Mot de passe incorect' });
    }
  }

});


/* POST Sign up */
router.post('/sign-up', async function(req, res, next) {

  console.log('data from front', req.body)
  var salt = uid2(32);
  const newUser = new userModel({

    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,    
    password: SHA256(req.body.password + salt).toString(encBase64),
    salt : salt,
    token : uid2(32)
  })

  const saveUser = await newUser.save()

  console.log('New user in databse -->',newUser )

  res.json({result:true,newUser});
  
});




module.exports = router;
