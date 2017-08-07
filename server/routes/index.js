var path = require('path');

module.exports = function(app) {
  app.use('/user', require('../api/user'));
  app.use('/project', require('../api/project'));
  app.use('/comment', require('../api/comment'));
  app.use('/messages', require('../api/message'));
  // catch 404 and forward to Angular
  app.all('/*', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });
};
