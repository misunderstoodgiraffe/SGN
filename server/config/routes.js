var userController = require('../apis/fbController.js');
var OAuth = require('oauthio');
OAuth.initialize('BqQzmRHEA0gxZSaUVbqEaPmDyM8', 'hnjFc9WbVJuKigl8NmnVbjmD3jA');
var userdb = require('../requestHandlers/users.js');

module.exports = function (app, express) {
  app.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
    return userController.getFacebookData(result, req, res);
  }));
  app.get('/signin', OAuth.auth('facebook', 'http://localhost:3000/oauth/redirect'));
  app.get('/users/profile', userdb.getProfile);
  app.get('/users/friends', userdb.getFriends);
  app.put('./users/profile', userdb.updateProfile);
};