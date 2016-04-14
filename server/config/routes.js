var fbController = require('../apis/fbController.js');
var OAuth = require('oauthio');
OAuth.initialize('BqQzmRHEA0gxZSaUVbqEaPmDyM8', 'hnjFc9WbVJuKigl8NmnVbjmD3jA');
var userdb = require('../requestHandlers/users.js');
var steam = require('../apis/steamController.js');

module.exports = function (app, express) {
  app.get('/', function(req, res, next) {
    if (!req.session.userJwtToken) {
      res.redirect('/welcome/welcome.html');
      res.end();
    } else {
      // redirect to next url e.g. /#/home
      next();
    }
  });
  app.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
    return fbController.getFacebookData(result, req, res);
  }));
  app.get('/signin', OAuth.auth('facebook', 'http://localhost:3000/oauth/redirect'));
  app.get('/users/profile', userdb.getProfile);
  app.get('/users/friends', userdb.getFriends);
  app.put('/users/profile', userdb.updateProfile);

  app.get('/updateSteam', steam.getPlayerData);
  app.get('/updateSteamFriends', steam.getAllFriends);

};