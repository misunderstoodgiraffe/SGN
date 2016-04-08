var userController = require('./controller.js');

module.exports = function (app, express) {
  app.get('/signin', userController.signin);


};