var userController = require('./controller.js');

module.exports = function (app, express) {

  app.post('/signup', userController.signup);
  app.get('/signin', userController.checkAuth);
  app.post('/addfriend', userController.addFriend);
  app.get('/friends', userController.getFriends);
};