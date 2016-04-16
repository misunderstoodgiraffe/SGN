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
  // app.get('/signin', OAuth.auth('facebook', 'http://localhost:3000/oauth/redirect'));
  app.get('/signin', OAuth.auth('facebook', 'http://52.33.10.174:3000/oauth/redirect'));

  app.get('/signout', userdb.signout);
  app.get('/users/profile', userdb.getProfile);
  app.get('/users/friends', userdb.getFriends);
  app.put('/users/profile', userdb.updateProfile);
  app.post('/users/steam', userdb.updateSteamProfile);
  app.get('/users/steam', userdb.getSteamProfile);
  app.post('/users/friends', userdb.addFriend);


  //STEAM API ENDPOINTS
  app.get('/updateSteam', steam.getPlayerData);
  app.get('/updateSteamFriends', steam.getAllFriends);
  app.get('/getSteamGames', steam.getAllGames)

};