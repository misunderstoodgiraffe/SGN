var db = require('./db.js');

module.exports = {
  getAllUsers: function (callback) {
    db.Users.findAll().then(function(data) {
      var results = [];
      for (var i in data) {
        results.push(data[i].dataValues);
      }
      callback(results);
    });
  },
  searchUsers: function (query, callback) {
    db.Users.findAll({where: query})
      .then(function(result) {
        var results = [];
        for (var i in result) {
          results.push(result[i].dataValues);
        }
        callback(results);
    });
  },
  newUser: function (user, callback) {
    var newUser = db.Users.build(user);
    newUser.save().then(function(data) {
      callback(null, data.dataValues);
    }).catch(function(error) {
      if (error.errors) {
        if (error.errors[0].message === 'fbID must be unique') {
          callback(new Error('user already exists'));
        } else {callback(error)}
      } else {callback(error)}
    });
  },
  newFriend: function (user1, user2, callback) {
    var newFriends = db.Friends.build({
      userIdlink1: user1.id,
      userIdlink2: user2.id
    });
    newFriends.save().then(function(response) {
      console.log('beuller?');
      if (callback) {callback(response)}
    }).catch(function(error) {console.log});
  },
  getFriends: function(user, callback) {
    db.Friends.findAll({where: {$or: [
      {userIdlink1: user.id},
      {userIdlink2: user.id}
      ]}})
    .then(function(fiends){
      callback(friends)});
  }
};