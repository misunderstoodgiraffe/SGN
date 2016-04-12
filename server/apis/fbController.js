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
          // user is already in database
          if (error.name === "SequelizeUniqueConstraintError") {
            db.search({fbID: me.id}, function(user) {
              if (user) { res.send(user); } else {
                res.send('Error retrieving user');
              }
            });
      
          }
        } else {
          // make a token and send it back to the front end?
          var token = jwt.encode(user, 'secret');
          req.session.userJwtToken = token;
          // !! Redirect to create profile page not home !! //
          res.redirect('http://localhost:3000/#/home');
        }

        
      });
    });
  },
};