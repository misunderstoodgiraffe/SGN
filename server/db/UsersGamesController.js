var db = require('./db.js');
var Users = require('./UsersController.js');
var Games = require('./GamesController.js');
module.exports = {
  getUsersGames: function(user, callback) {
    db.UsersGames.findAll({where: {userID: user.id}})
      .then(function(games) {
        var myGames = [];
        for (var i in myGames) {
          Games.getGame({id: myGames[i].gameID}, function(err, game) {
            if (err) {console.log(err)}
            users.push(game);
            if (myGames.length === games.length) {
              callback(null, myGames);
            }
          }).catch(console.log);
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
    var entry = {userID: user.id, gameID: game.id}
    db.UsersGames.findOne({where: entry}).then(function(exists) {
      if (exists) {
        callback(new Error('User already owns game'), exists.dataValues)
      } else {
        var newGame = db.UsersGames.create(entry)
        .then(function(newGameOwner) {
          callback(null, newGameOwner.dataValues);
        })
      }
    }).catch(console.log);
  }
}