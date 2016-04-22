var fbController = require('../apis/fbController.js');
var OAuth = require('oauthio');
OAuth.initialize('BqQzmRHEA0gxZSaUVbqEaPmDyM8', 'hnjFc9WbVJuKigl8NmnVbjmD3jA');
var userdb = require('../requestHandlers/users.js');
var steam = require('../apis/steamController.js');
var key = require('./keys.js');
var authCheck = require('./authMiddleware.js');

module.exports = function (app, express) {
  app.get('/', function(req, res, next) {
    if (!req.session.userJwtToken) {
      res.redirect(key.HOST + '/welcome.html');
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
  app.get('/api/me/profile', authCheck, userdb.getProfile);
  app.put('/api/me/profile', authCheck, userdb.updateProfile);
  
  //FRIENDS table
  app.get('/api/me/friends', authCheck, userdb.getFriends);
  app.post('/api/me/friends', authCheck, userdb.addFriend);
  app.get('/api/me/addFriends', authCheck, userdb.findFBFriends);
  
  //STEAM table
  app.get('/api/me/steam', authCheck, userdb.getSteamProfile);
  app.post('/api/me/steam', authCheck, userdb.updateSteamProfile);

  //GAMES table
  app.get('/api/steam/games', authCheck, userdb.getSteamGame);
  app.post('/api/steam/games', userdb.addSteamGame);

  //USERSGAMES table
  app.get('/api/me/games', authCheck, userdb.getUserGameRelation);
  app.post('/api/me/games', authCheck, userdb.addUserGameRelation);


  //STEAM API ENDPOINTS
  app.get('/api/updateSteam', authCheck, steam.getPlayerData);
  app.get('/api/updateSteamFriends', authCheck, steam.getAllFriends);
  app.get('/api/getSteamGames', authCheck, steam.getAllGames);
  app.get('/api/getGameInfo', authCheck, steam.getGameInfo);

};