const fbController = require('./utils/fbController.js');
const key = require('./config/keys.js');
const OAuth = require('oauthio');
OAuth.initialize(key.FACEBOOK_API_KEY, key.FACEBOOK_API_SECRET);
const controllers = require('./controllers/users.js');
const steam = require('./utils/steamController.js');
const authCheck = require('./utils/authMiddleware.js');

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
  app.get('/signout', controllers.signout);

  //USERS table
  app.get('/api/me/profile', authCheck, controllers.getProfile);
  app.put('/api/me/profile', authCheck, controllers.updateProfile);

  //FRIENDS table
  app.get('/api/me/friends', authCheck, controllers.getFriends);

  //STEAM table
  app.get('/api/me/steam', authCheck, controllers.getSteamProfile);
  app.post('/api/me/steam', authCheck, controllers.updateSteamProfile);

  //GAMES table
  app.get('/api/steam/games', authCheck, controllers.getSteamGame);
  app.post('/api/steam/games', controllers.addSteamGame);

  //USERSGAMES table
  app.get('/api/me/games', authCheck, controllers.getUserGameRelation);
  app.post('/api/me/games', authCheck, controllers.addUserGameRelation);


  //STEAM API ENDPOINTS
  app.get('/api/updateSteam', authCheck, steam.getPlayerData);
  app.get('/api/updateSteamFriends', authCheck, steam.getAllFriends);
  app.get('/api/getSteamGames', authCheck, steam.getAllGames);
  app.get('/api/getGameInfo', authCheck, steam.getGameInfo);
};
