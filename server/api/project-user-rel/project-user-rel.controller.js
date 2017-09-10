const express = require('express');
const router = express.Router();
const relationModel = require('./project-user-rel.model');

exports.getAllRelations = function(req, res, next) {
  relationModel.find()
    .then(relations => {
      res.json(relations);
    })
    .reject(err => {
      res.status(500).json(err);
    });
};

exports.createRelation = function(req, res, next) {
  const newRelation = new relationModel({
    registered: true,
    projectId: req.body.projectId,
    userId: req.body.userId,
    status: 'Candidate'
  });

  newRelation.save((err) => {
    if (err) {
      res.status(400).json({
        message: "Something went wrong"
      });
    } else {
      req.login(newRelation, function(err) {
        if (err) {
          return res.status(500).json({
            message: 'something went wrong :('
          });
        }
        res.status(200).json(newRelation);
      });
    }
  });
};

exports.showRelationsById = function(req, res) {
  let Id = req.params.id;
  relationModel.find({
      projectId: Id
    }).populate('userId')
    .exec()
    .then((relations) => res.status(200).json(relations))
    .catch(err => res.status(500).json(err));
};


exports.deleteRelation = function(req, res) {
  let relationId = req.params.id;
  relationModel.findByIdAndRemove(
      relationId
    ).then(relation => {
      return res.status(200).json(relation);
    })
    .catch(err => {
       res.status(500).json(err);
    });
};

exports.updateRelation = function(req, res) {
  let status = req.body.status;
  let relationId = req.body.relationId;
  relationModel.findByIdAndUpdate(
      relationId,
    {'status':status},{ 'new': true}).populate('userId')
    .exec()
    .then(relation => {
      return res.status(200).json(relation);
    })
    .catch(error => {
          res.status(500).json(err);
    });
};

exports.getSpecific = function(req, res) {
  let userId=req.query.userId;
  let projectId = req.query.projectId;
  relationModel.findOne({
      projectId: projectId,
      userId: userId
    }).populate('userId')
    .exec()
    .then((relation) => res.status(200).json(relation))
    .catch(err => res.status(500).json(err));
};
