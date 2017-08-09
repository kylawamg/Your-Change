var express = require('express');
var controller = require('./project.controller');

var router = express.Router();

router.get('/', controller.getAllProjects);
router.get('/myprojects/:id', controller.getAllByUser);
router.post('/new', controller.createProject);
router.get('/detail/:id', controller.singleProject);
router.put('/edit/:id', controller.editProject);
router.delete('/delete/:id', controller.deleteProject);
router.get('/:type', controller.getAllByType);
router.put('/addCandidate', controller.addCandidate);
router.put('/declineCandidate', controller.declineCandidate);
router.put('/acceptCandidate', controller.acceptCandidate);

module.exports = router;
