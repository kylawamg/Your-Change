mongoose = require('mongoose');

const express = require("express");
const authController = express.Router();
const passport = require("passport");

// Our user model
const User = require("./user.model");

// Bcrypt let us encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

exports.editUser = function(req, res, next) {
  var _id = req.params.id;
  var username = req.body.username;
  var name = req.body.name;
  var lastName = req.body.lastName;
  var city = req.body.city;
  var country = req.body.country;
  var email = req.body.email;


  const user = {
    name,
    lastName,
    city,
    country,
    email
  };

  const criteria = {
    _id: _id
  };
  const update = {
    $set: {
      name,
      lastName,
      city,
      country,
      email
    }
  };



  User.updateOne(criteria, update, function(err, user) {
    if (err) return next(err);
    res.status(200).json(req.user);
  });

};

exports.createUser = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name;
  var email = req.body.email;
  var type = req.body.type;
  var city = req.body.city;
  var country = req.body.country;
  var address = req.body.address;

  if (!username || !password) {
    res.status(400).json({
      message: "Provide username and password"
    });
    return;
  }

  User.findOne({
    username
  }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({
        message: "The username already exists"
      });
      return;
    }

    var salt = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass,
      name,
      email,
      type,
      city,
      country,
      address
    });
    console.log(newUser);
    newUser.save((err) => {
      if (err) {

        res.status(400).json({
          message: "Something went wrong"
        });
      } else {
        req.login(newUser, function(err) {
          if (err) {
            return res.status(500).json({
              message: 'something went wrong :('
            });
          }
          res.status(200).json(req.user);
        });
      }
    });
  });
};

exports.logInUser = function(req, res, next) {
  console.log(req.body);

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json(info);
    }

    req.login(user, function(err) {
      if (err) {
        return res.status(500).json({
          message: 'something went wrong :('
        });
      }
      res.status(200).json(req.user);
    });
  })(req, res, next);
};
exports.getUserProfile = function(req,res,next){

  User.findById(req.params.id)
  .then(userDetail => {res.json(userDetail);
  })
  .reject(err => { res.status(500).json(err);
  });
};

exports.logoutUser = function(req, res, next) {
  req.logout();
  res.status(200).json({
    message: 'Success'
  });
};

exports.getOngs = function(req,res,next){
  User.findById(req.params.type)
  .then(ongs => {res.json(ongs);
  })
  .reject(err => { res.status(500).json(err);
  });
};

exports.logoutUser = function(req, res, next) {
  req.logout();
  res.status(200).json({
    message: 'Success'
  });
};
exports.loggedInUser = function(req, res, next) {
  if (req.isAuthenticated()) {
     res.status(200).json(req.user);
  } else {
    res.status(403).json({
     message: 'Unauthorized'
   });
  }

};
