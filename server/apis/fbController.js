var db = require('../db/dbController.js');
var jwt = require('jwt-simple');

module.exports = {

  /* Me is a JSON object containing facebook information about the user
  It includes id, name, avatar, and gender among a few other properties */
  getFacebookData: function(result, req, res) {
    if (result instanceof Error) {
      res.send(500, 'error: ' + result.message);
    }
    result.me().done(function(me) {
      console.log(me.id);

      //Add new user to database
      db.newUser({fbID: me.id, givenName: me.name}, function(error, user) {

        if (error) { 
          if (error.message === 'user already exists') { 
            // user is already in database
            db.searchUsers({fbID: me.id}, function(error, users) {
              var user = users[0];
              var token = jwt.encode(user, 'secret');
              req.session.userJwtToken = token;
              // !! Redirect to create profile page not home !! //
              res.redirect('http://localhost:3000/#/home');
            });
          } else {
            // unknown error
            res.send(500, error);
          }

          // New user
        } else {
          var token = jwt.encode(user, 'secret');
          req.session.userJwtToken = token;
          // !! Redirect to create profile page not home !! //
          res.redirect('http://localhost:3000/#/home');
        }

        
      });
    });
  },

};