var db = require('../db/db.js');

module.exports = {
  getGame: function(game, callback) {
    db.Games.findOne({where: game})
    .then(function(game) {
      callback(null, game);
    }).catch(function(err) {callback(err, null)})
  },
  addGame: function(game, callback) {
    var newGame = db.Games.create(game)
    .then(function(data) {
      callback(null, data.dataValues);
    }).catch(function(error) {
      if (error.errors) {
        if (error.errors[0].message === 'gameID must be unique') {
          db.Games.findOne({where: game}).then(function(existingGame) {
            callback(new Error('game already exists'), existingGame);
          });
        } else {callback(error, null)}
      } else {callback(error, null)}
    });
  }
}
