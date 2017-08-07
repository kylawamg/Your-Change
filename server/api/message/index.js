var express = require('express');
var controller = require('./message.controller');

var router = express.Router();

router.get('/', controller.getAllMessages);
router.post('/new', controller.createMessage);
router.delete('/delete/:id', controller.deleteMessage);
router.get('/showMessages/:id', controller.getMessagesByUser);
module.exports = router;
