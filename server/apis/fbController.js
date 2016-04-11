var db = require('../db/dbController.js');

module.exports = {

  /* Me is a JSON object containing facebook information about the user
  It includes id, name, avatar, and gender among a few other properties */
  getFacebookData: function(result, req, res) {
    if (result instanceof Error) {
      res.send(500, 'error: ' + result.message);
    }

    result.me().done(function(me) {
      // create a new user with the given facebook id and name
      db.newUser({fbID: me.id, givenName: me.name}, function(user) {
        res.send(200, JSON.stringify(me));
      });
    });
  },
};