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
// POST
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
			return res.status(201).json(project);
		});
	});
  /*
  newComment.save((err) => {
    if (err) {
      res.status(400).json({
        message: "Something went wrong"
      });
    } else {
      req.login(newComment, function(err) {
        if (err) {
          return res.status(500).json({
            message: 'something went wrong :('
          });
        }
        projectModel.findByIdAndUpdate(_project, {
            $push: {
              comments: newComment._id
            }
          })
          .then(project => {
            console.log(project);
            console.log(newComment);
            res.status(200).json(newComment);
          });

      });
    }
  });*/
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
