var fbController = require('../apis/fbController.js');
var OAuth = require('oauthio');
OAuth.initialize('BqQzmRHEA0gxZSaUVbqEaPmDyM8', 'hnjFc9WbVJuKigl8NmnVbjmD3jA');

module.exports = function (app, express) {
  app.get('/', function(req, res, next) {
    if (!req.session.userJwtToken) {
      res.redirect('/welcome.html');
      res.end();
    } else {
      console.log("redirect to dashboard");
      next();
    }
  });
  app.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
    return fbController.getFacebookData(result, req, res);
  }));
  app.get('/signin', OAuth.auth('facebook', 'http://localhost:3000/oauth/redirect'));

};