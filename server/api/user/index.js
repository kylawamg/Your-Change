var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/login', controller.logInUser);
router.post('/signup', controller.createUser);
router.post('/logout', controller.logoutUser);
router.get('/loggedin', controller.loggedInUser);
router.post('/edit/:id', controller.editUser);
router.get('/:id',controller.getUserProfile);



module.exports = router;
