var Users = require('../db/UsersController.js');
var Friends = require('../db/FriendsController.js');
var Steam = require('../db/SteamController.js')
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
  addFriend: function(req, res, next) {
    var user1 = req.body.user1;
    var user2 = req.body.user2;
    console.log('REQUEST BODY!!!!!', req.body); 
    Friends.newFriend(user1, user2, function(err, friend) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(201).send(friend);
      }
    });
  },
  updateProfile: function(req, res, next) {
    // var user = jwt.decode(req.session.userJwtToken, 'secret');
    console.log(req.body);
    Users.updateProfile(req.body, function(err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    });
  },
  updateSteamProfile: function(req, res, next) {
    // var user = jwt.decode(req.session.userJwtToken, 'secret');
    console.log(req.body);
    Steam.addSteam(req.body, function(err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    });
  },
  getSteamProfile: function(req, res, next) {
    // var user = jwt.decode(req.session.userJwtToken, 'secret');
    console.log('REQUEST BODY IS', req.query);
    Steam.getSteam(req.query, function(err, response) {
      if (err) {
        res.status(204).send('user not found');
      } else {
        res.status(200).send(response);
      }
    });
  },
  addSteamGame: function(req, res, next) {
    // var user = jwt.decode(req.session.userJwtToken, 'secret');
    console.log('REQUEST BODY IS', req.query);
    Steam.getSteam(req.query, function(err, response) {
      if (err) {
        res.status(204).send('user not found');
      } else {
        res.status(200).send(response);
      }
    });
  },
  signout: function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
    res.end();
  }
};
