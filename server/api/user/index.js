var express = require('express');
var controller = require('./user.controller');
const upload = require('../../config/multer');
var router = express.Router();

router.post('/login', controller.logInUser);
router.post('/signup', upload.single('file'), controller.createUser);
router.post('/logout', controller.logoutUser);
router.get('/loggedin', controller.loggedInUser);
router.post('/edit/:id', upload.single('file'), controller.editUser);
router.get('/profile/:id',controller.getUserProfile);
router.get('/type/:id', controller.getOngs);


module.exports = router;
