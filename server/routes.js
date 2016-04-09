var userController = require('./controller.js');
var OAuth = require('oauthio');
OAuth.initialize('BqQzmRHEA0gxZSaUVbqEaPmDyM8', 'hnjFc9WbVJuKigl8NmnVbjmD3jA');

module.exports = function (app, express) {
  app.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
    return userController.getFacebookData(req, res);
  }));
  app.get('/signin', OAuth.auth('facebook', 'http://localhost:3000/oauth/redirect'));

};