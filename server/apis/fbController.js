var userdb = require('../db/UsersController.js');
var jwt = require('jwt-simple');

module.exports = {

  /* Me is a JSON object containing facebook information about the user
  It includes id, name, avatar, and gender among a few other properties */
  getFacebookData: function(result, req, res) {
    if (result instanceof Error) {
      res.send(500, 'error: ' + result.message);
    } else {
      result.me().done(function(me) {

        //Add new user to database
        userdb.newUser({fbID: me.id, givenName: me.name, avatar: me.avatar}, function(error, user) {

          if (error) { 
            if (error.message === 'user already exists') { 
              // user is already in database
              userdb.searchUsers({fbID: me.id}, function(error, users) {
                var user = users[0];
                var token = jwt.encode(user, 'secret');
                req.session.userJwtToken = token;
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
    }
  },

};