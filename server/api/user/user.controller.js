mongoose = require('mongoose');

const express = require("express");
const authController = express.Router();
const passport = require("passport");
const upload = require('../../config/multer');
const User = require("./user.model");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

exports.editUser = function(req, res, next) {
  var _id = req.params.id;
  var name = req.body.name;
  var lastName = req.body.lastName;
  var city = req.body.city;
  var country = req.body.country;
  var email = req.body.email;
  var age = req.body.age;
  var description = req.body.description;
  const update = {
      name,
      lastName,
      city,
      country,
      email,
      age,
      description
  };
  if (req.file) update.picPath = `/uploads/${req.file.filename}`;

  User.findByIdAndUpdate(_id, update, function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'something went wrong :('
      });}
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
      if (req.file) newUser.picPath = `/uploads/${req.file.filename}`;
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
  const typo = req.params.id;
  console.log(req.params);
  User.find({'type':typo})
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
