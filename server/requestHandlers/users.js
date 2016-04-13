var Users = require('../db/UsersController.js');
var Friends = require('../db/FriendsController.js');
var jwt = require('jwt-simple');

module.exports = {
  getProfile: function(req, res, next) {
    // console.log(req.session.userJwtToken);
    var user = jwt.decode(req.session.userJwtToken, 'secret');
    Users.getOneUser(user, function(err, profile) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(profile);
      }
    });
  },
  getFriends: function(req, res, next) {
    var user = jwt.decode(req.session.userJwtToken, 'secret');
    Friends.getAllFriends(user, function(err, friends) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(friends);
      }
    });
  },
  updateProfile: function(req, res, next) {
    var user = jwt.decode(req.session.userJwtToken, 'secret');
    Users.updateProfile(user, function(err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    });
  }
}
