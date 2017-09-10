const express = require('express');
const router = express.Router();
const commentModel = require('./comment.model');
const projectModel = require('../project/project.model');

exports.getAllComments = function(req, res, next) {
  commentModel.find()
    .then(reviewList => {
      res.json(reviewList);
    })
    .reject(err => {
      res.status(500).json(err);
    });
};

exports.createComment = function(req, res, next) {

  const newComment = new commentModel({
    content: req.body.content,
    creator: req.body._creator,
    project: req.body._project
  });
  newComment.save().then(comment=>{
    console.log(comment);
		projectModel.findByIdAndUpdate(newComment.project,{ $push:{comments: comment._id }})
			.then(project=>{
			return res.status(201).json(comment);
		});
	});
};

exports.getCommentsByProject = function(req, res) {
  let projectId = req.params.id;
  commentModel.find({
      project: projectId
    }).populate('creator')
    .exec()
    .then((comments) => res.status(200).json(comments))
    .catch(err => res.status(500).json(err));
};

exports.deleteComment = function(req, res) {
  let messageId = req.params.id;
  commentModel.deleteOne({
      _id: messageId
    }).then(message => {
      return res.status(200).json(message);
    })
    .catch(err => res.status(500).json(err));
};
