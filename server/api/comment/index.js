var express = require('express');
var controller = require('./comment.controller');

var router = express.Router();

router.get('/', controller.getAllComments);
router.post('/new', controller.createComment);
router.delete('/delete/:id', controller.deleteComment);
router.get('/showComments/:id', controller.getCommentsByProject);
module.exports = router;
