const express = require('express');
const router = express.Router();
const messageModel = require('./message.model');
//const projectModel = require('../project/project.model');

exports.getAllMessages = function(req, res, next) {
  messageModel.find()
    .then(reviewList => {
      res.json(reviewList);
    })
    .reject(err => {
      res.status(500).json(err);
    });
};
// POST
exports.createMessage = function(req, res, next) {

  const newMessage = new messageModel({
    subject: req.body.subject,
    content: req.body.content,
    from: req.body.from,
    to: req.body.to
  });
/*  newMessage.save().then(message=>{

		projectModel.findByIdAndUpdate(newComment.project,{ $push:{comments: comment._id }})
			.then(project=>{
			return res.status(201).json(comment);
		});
	});*/

  newMessage.save((err) => {
    if (err) {

      res.status(400).json({
        message: "Something went wrong"
      });
    } else {
      req.login(newMessage, function(err) {
        if (err) {
          return res.status(500).json({
            message: 'something went wrong :('
          });
        }
        res.status(200).json(newMessage);
      });
    }
  });
};

exports.getMessagesByUser = function(req, res) {
  let userId = req.params.id;
  commentModel.find({
      to: userId
    }).populate('from')
    .exec()
    .then((messages) => res.status(200).json(messages))
    .catch(err => res.status(500).json(err));
};


exports.deleteMessage = function(req, res) {
  let messageId = req.params.id;
  commentModel.deleteOne({
      _id: messageId
    }).then(message => {
      return res.status(200).json(message);
    })
    .catch(err => res.status(500).json(err));
};
