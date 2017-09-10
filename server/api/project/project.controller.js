mongoose = require('mongoose');
projectModel = require('./project.model');
userModel = require('../user/user.model');

exports.getAllProjects = function (req,res,next){
  projectModel.find().populate('creator').exec()
  .then( projectList => {res.json(projectList);
  })
  .reject(err => { res.status(500).json(err);
  });
};

exports.getAllByType = function(req,res,next){

  const typo = req.params.type;
  projectModel.find({'type':typo})
  .then(projectList => {res.json(projectList);
  })
  .reject(err => { res.status(500).json(err);
  });
};

exports.getAllByUser = function(req,res,next){
  const id = req.params.id;

  projectModel.find({'creator':id})
  .then(projectList => {  console.log(projectList);res.json(projectList);

  })
  .reject(err => { res.status(500).json(err);
  });

};

exports.singleProject = function(req,res,next){
  projectModel.findById(req.params.id).populate('creator')
  .populate('candidates')
  .populate('volunteers')
  .exec()
  .then(projectDetail => {res.json(projectDetail);
  })
  .reject(err => { res.status(500).json(err);
  });
};

exports.createProject = function(req, res, next) {
  const newProject = new projectModel({
    creator: req.body.creator,
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
    deadLine: req.body.deadLine,
    profile: req.body.profile,
    tags: req.body.tags,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    vacancies: req.body.vacancies,
    position: JSON.parse(req.body.position)
  });

  if (req.file) newProject.imgUrl = `/uploads/${req.file.filename}`;

	newProject.save()
      .then( project => {res.json({ message: 'New Project created!', id: newProject._id });})
      .catch( err => {res.status(500).json({error:err, message:"Cannot create the project"});
    });
};

exports.editProject = function(req, res ,next) {
  const updates = {
    title:         req.body.title,
    type:          req.body.type,
    address:       req.body.address,
    description:   req.body.description,
    deadLine:      req.body.deadLine,
    profile:       req.body.profile,
    tags:          req.body.tags,
    startDate:     req.body.startDate,
    endDate:       req.body.endDate,
    vacancies:     req.body.vacancies
  };
  projectModel.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Unable to update project", err});
    }
    res.json({ message: 'Project updated successfully'});
  });
};

exports.addCandidate = function (req,res,next){
  const userId = req.body.userId;
  const projectId = req.body.projectId;


  projectModel.findByIdAndUpdate(projectId, { $push:{candidates: userId }})
  .populate('candidates')
  .populate('creator')
  .populate('volunteers')
  .exec()
  .then(project =>{

    userModel.findByIdAndUpdate(userId, {$push:{pendingProjects: projectId}}).then(user =>{
      console.log(project);
      return res.status(201).json(project);
    });
  });
};

exports.declineCandidate = function (req,res,next){
  const userId = req.body.userId;
  const projectId = req.body.projectId;
  projectModel.findByIdAndUpdate(projectId, { $pull:{candidates: userId }},{ 'new': true})
  .populate('candidates')
  .populate('creator')
  .populate('volunteers')
  .exec()
  .then(project =>{

    userModel.findByIdAndUpdate(userId, {$pull:{pendingProjects: projectId}}).then(user =>{
      console.log(project);
      return res.status(201).json(project);
    });
  });
};

exports.acceptCandidate = function (req,res,next){
  const userId = req.body.userId;
  const projectId = req.body.projectId;

  projectModel.findByIdAndUpdate(projectId, { $push:{volunteers: userId }, $pull:{candidates:userId}},{ 'new': true})
  .populate('candidates')
  .populate('volunteers')
  .populate('creator')
  .exec()
  .then(project =>{

    userModel.findByIdAndUpdate(userId, {$push:{acceptedProjects: projectId}, $pull:{pendingProjects:projectId}}).then(user =>{
      console.log("accepted");
      console.log(project);
      return res.status(201).json(project);
    });
  });
};

exports.deleteVolunteer = function (req,res,next){
  const userId = req.body.userId;
  const projectId = req.body.projectId;
  projectModel.findByIdAndUpdate(projectId, { $push:{candidates: userId},$pull:{volunteers: userId }},{ 'new': true})
  .populate('candidates')
  .populate('creator')
  .populate('volunteers')
  .exec()
  .then(project =>{

    userModel.findByIdAndUpdate(userId, {$push:{pendingProjects: projectId},$pull:{acceptedProjects: projectId}}).then(user =>{
      console.log(project);
      return res.status(201).json(project);
    });
  });
};


exports.deleteProject = function (req, res) {
    projectModel.findByIdAndRemove(req.params.id)
      .then((list) => res.status(202).json({ message: 'project removed successfully' }))
      .catch(err => res.status(500).json({ message: 'impossible to remove the project', error: err }));
};
