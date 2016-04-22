var userdb = require('../db/UsersController.js');
var jwt = require('jwt-simple');
var key = require('../config/keys.js');
var request = require('request');
var Friends = require('../db/FriendsController.js');

//Returns array of names and facebook IDs
var getFacebookFriends = function(session, callback) {
  request('https://graph.facebook.com/v2.5/me/friends?access_token=' + session.oauth.facebook.access_token, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(null, JSON.parse(body).data);
    } else {
      callback(error, null);
    }
  });
}

module.exports = {

  /* Me is a JSON object containing facebook information about the user
  It includes id, name, avatar, and gender among a few other properties */
  getFacebookData: function(result, req, res) {
    if (result instanceof Error) {
      res.status(500).send('error: ' + result.message);
    } else {
      result.me().done(function(me) {
        //Add new user to database
        userdb.newUser({fbID: me.id, givenName: me.name, avatar: me.avatar}, function(error, user) {

          if (error) { 
            if (error.message === 'user already exists') { 
              // user is already in database
              var token = jwt.encode(user, 'secret');
              req.session.userJwtToken = token;
              res.redirect(key.HOST + '/#/profile');
            } else {
              // unknown error
              res.status(500).send(error);
            }

            // New user
          } else {
            var token = jwt.encode(user, 'secret');
            req.session.userJwtToken = token;
            getFacebookFriends(req.session, function(err, friends) {
              if (friends) {
                friends.forEach(function(item, index, array) {
                  userdb.getOneUser({fbID: item.id}, function(err, ifUser) {
                    if (err) {console.log(err)} else {
                      if (ifUser) {
                        Friends.newFriend(user, ifUser, function(err, added) {
                          if (err) {console.log(err)} else {console.log(added)};
                        });
                      }
                    }
                  });
                });
              }
            });
            // !! Redirect to create profile page not home !! //
            res.redirect(key.HOST + '/#/updateProfile');
          }

        });
      });
    }
  },
  getFacebookFriends: getFacebookFriends
};