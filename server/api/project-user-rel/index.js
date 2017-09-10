var express = require('express');
var controller = require('./project-user-rel.controller');
var router = express.Router();

router.get('/', controller.getAllRelations);
router.post('/new', controller.createRelation);
router.delete('/delete/:id', controller.deleteRelation);
router.get('/showRelations/:id', controller.showRelationsById);
router.put('/updateStatus', controller.updateRelation);
router.get('/getSpecific', controller.getSpecific);

module.exports = router;
