mongoose = require('mongoose');
projectModel = require('./project.model');
userModel = require('../user/user.model');

//Get all projects
exports.getAllProjects = function (req,res,next){
  projectModel.find().populate('creator').exec()
  .then( projectList => {res.json(projectList);
  })
  .reject(err => { res.status(500).json(err);
  });
};

//Get project filtering by type
exports.getAllByType = function(req,res,next){

  const typo = req.params.type;
  projectModel.find({'type':typo})
  .then(projectList => {res.json(projectList);
  })
  .reject(err => { res.status(500).json(err);
  });
};

//Get project filtering by creator
exports.getAllByUser = function(req,res,next){
  const id = req.params.id;

  projectModel.find({'creator':id})
  .then(projectList => {  console.log(projectList);res.json(projectList);

  })
  .reject(err => { res.status(500).json(err);
  });
//todo
};

// Get project detail by id
exports.singleProject = function(req,res,next){
  projectModel.findById(req.params.id).populate('creator')
  .exec()
  .then(projectDetail => {res.json(projectDetail);
  })
  .reject(err => { res.status(500).json(err);
  });
};

exports.createProject = function(req, res, next) {
    console.log(req.body.position);
  const newProject = new projectModel({
    creator: req.body.creator,
    title: req.body.title,
    type: req.body.type,
    address: req.body.address,
    description: req.body.description,
    deadLine: req.body.deadLine,
    profile: req.body.profile,
    tags: req.body.tags,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    vacancies: req.body.vacancies,
    position:{ longitud: req.body.position.longitud,
    latitud: req.body.position.latitud}

  });

	newProject.save()
      .then( project => {res.json({ message: 'New Project created!', id: newProject._id });})
      .catch( err => {res.status(500).json({error:err, message:"Cannot create the project"});
    console.log(err);});
};

exports.editProject = function(req, res ,next) {

  const updates = {
    title:         req.body.title,
    type:          req.body.type,
    address:        req.body.address,
    description:    req.body.description,
    deadLine:    req.body.deadLine,
    profile:      req.body.profile,
    tags:      req.body.tags,
    startDate:         req.body.startDate,
    endDate:     req.body.endDate,
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


exports.deleteProject = function (req, res) {
    projectModel.findByIdAndRemove(req.params.id)
      .then((list) => res.status(202).json({ message: 'project removed successfully' }))
      .catch(err => res.status(500).json({ message: 'impossible to remove the project', error: err }));
};
