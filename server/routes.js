var userController = require(/*user controller*/);

module.exports = function (app, express) {

  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);
  app.get('/api/users/signedin', userController.checkAuth);

  app.post('/api/users/signin', userController.addFriend);



};