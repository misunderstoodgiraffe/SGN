var fbController = require('../apis/fbController.js');
var OAuth = require('oauthio');
OAuth.initialize('BqQzmRHEA0gxZSaUVbqEaPmDyM8', 'hnjFc9WbVJuKigl8NmnVbjmD3jA');
var userdb = require('../requestHandlers/users.js');
var steam = require('../apis/steamController.js');
var key = require('./keys.js');

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

  //OAUTH handling
  app.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
    return fbController.getFacebookData(result, req, res);
  }));
  app.get('/signin', OAuth.auth('facebook', key.HOST + '/oauth/redirect'));
  app.get('/signout', userdb.signout);
  
  //USERS table
  app.get('/users/profile', userdb.getProfile);
  app.put('/users/profile', userdb.updateProfile);
  
  //FRIENDS table
  app.get('/users/friends', userdb.getFriends);
  app.post('/users/friends', userdb.addFriend);
  app.get('/users/addFriends', userdb.findFBFriends);
  
  //STEAM table
  app.get('/users/steam', userdb.getSteamProfile);
  app.post('/users/steam', userdb.updateSteamProfile);

  //GAMES table
  app.get('/steam/games', userdb.getSteamGame);
  app.post('/steam/games', userdb.addSteamGame);

  //USERSGAMES table
  app.get('/users/games', userdb.getUserGameRelation);
  app.post('/users/games', userdb.addUserGameRelation);


  //STEAM API ENDPOINTS
  app.get('/updateSteam', steam.getPlayerData);
  app.get('/updateSteamFriends', steam.getAllFriends);
  app.get('/getSteamGames', steam.getAllGames);
  app.get('/getGameInfo', steam.getGameInfo);

};