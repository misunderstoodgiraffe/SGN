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
      res.redirect(key.HOST + '/welcome/welcome.html');
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
  app.get('/users/profile', authCheck, userdb.getProfile);
  app.put('/users/profile', authCheck, userdb.updateProfile);
  
  //FRIENDS table
  app.get('/users/friends', authCheck, userdb.getFriends);
  app.post('/users/friends', authCheck, userdb.addFriend);
  app.get('/users/addFriends', authCheck, userdb.findFBFriends);
  
  //STEAM table
  app.get('/users/steam', authCheck, userdb.getSteamProfile);
  app.post('/users/steam', authCheck, userdb.updateSteamProfile);

  //GAMES table
  app.get('/steam/games', authCheck, userdb.getSteamGame);
  app.post('/steam/games', userdb.addSteamGame);

  //USERSGAMES table
  app.get('/users/games', authCheck, userdb.getUserGameRelation);
  app.post('/users/games', authCheck, userdb.addUserGameRelation);


  //STEAM API ENDPOINTS
  app.get('/updateSteam', authCheck, steam.getPlayerData);
  app.get('/updateSteamFriends', authCheck, steam.getAllFriends);
  app.get('/getSteamGames', authCheck, steam.getAllGames);
  app.get('/getGameInfo', authCheck, steam.getGameInfo);

};