const express = require('express');
const router  = express.Router();
const commentModel = require('./comment.model');


exports.getAllComments = function (req, res, next ){
  commentModel.find()
  .then( reviewList => {res.json(reviewList);})
  .reject(err => { res.status(500).json(err);});
};
// POST
exports.createComment = function(req, res, next) {


        const {from,to,content,stars} = req.body;

        var newComment= commentModel({
            from,
            to,
            description,
            stars
        });

        commentModel.save((err) => {
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
                    res.status(200).json(newReview);
                });
            }
        });
};

exports.getCommentsByProject = function(req, res) {
    let userId = req.params.id;
    commentModel.find({
        to: userId
    })
    .then((messages) => res.status(200).json(messages))
    .catch(err => res.status(500).json(err));
};


exports.deleteComment = function (req, res) {
    let messageId = req.params.id;
    commentModel.deleteOne({
        _id : messageId
    }).then(message => {
      return res.status(200).json(message);
    })
    .catch(err => res.status(500).json(err));
};
