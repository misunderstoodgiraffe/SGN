var userController = require('./controller.js');

module.exports = function (app, express) {
  app.get('/signin', function(req, res) {
    console.log('respond to signin request');
    res.send("Success");
  });

};