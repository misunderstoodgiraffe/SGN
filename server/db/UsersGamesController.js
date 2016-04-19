var db = require('./db.js');
var Users = require('./UsersController.js');
var Games = require('./GamesController.js');
module.exports = {
  getUsersGames: function(user, callback) {
    console.log('fetching games for userID:', user);
    db.UsersGames.findAll({where: {userID: user.sgnID}})
      .then(function(games) {
        var myGames = [];
        for (var i in games) {
          Games.getGame({gameID: games[i].dataValues.gameID}, function(err, game) {
            if (err) {console.log('ERROR', err)}
            myGames.push(game.dataValues);

            if (myGames.length === games.length) {
              callback(null, myGames);
            }
          })
          //.catch(function () {console.log('this is broken!')});
        };
    }).catch(function(error) {
      callback(error, null);
    });
  },
  getGamesUsers: function(game, callback) {
    db.UsersGames.findAll({where: {gameID: game.id}})
      .then(function(users) {
        var users = [];
        for (var i in users) {
          Users.GetOneUser({id: users[i].userID}, function(err, gameOwner) {
            if (err) {console.log(err)}
            users.push(gameOwner);
            if (users.length === games.length) {
              callback(null, users);
            }
          }).catch(console.log);
        };
    }).catch(function(error) {
      callback(error, null);
    });
  },
  addUserGame: function(user, game, callback) {
    db.UsersGames.findOne({where: {userID: user.id, gameID: game.steam_appid}}).then(function(exists) {
      if (exists) {
        callback(new Error('User already owns game'), exists.dataValues)
      } else {
        var newGame = db.UsersGames.create({userID: user.id, gameID: game.steam_appid})
        .then(function(newGameOwner) {
          callback(null, newGameOwner.dataValues);
        })
      }
    }).catch(console.log);
  }
}


