var db = require('./db.js');

module.exports = {
  getAllUsers: function (callback) {
    db.Users.findAll().then(function(data) {
      var results = [];
      for (var i in data) {
        results.push(data[i].dataValues);
      }
      callback(null, results);
    }).catch(function(error) {
      callback(error, null);
    });
  },
  searchUsers: function (query, callback) {
    db.Users.findAll({where: query})
      .then(function(result) {
        var results = [];
        for (var i in result) {
          results.push(result[i].dataValues);
        }
        callback(null, results);
    }).catch(function(error) {
      callback(error, null);
    });
  },
  newUser: function (user, callback) {
    var newUser = db.Users.create(user)
    .then(function(data) {
      callback(null, data.dataValues);
    }).catch(function(error) {
      if (error.errors) {
        if (error.errors[0].message === 'fbID must be unique') {
          callback(new Error('user already exists'), null);
        } else {callback(error, null)}
      } else {callback(error, null)}
    });
  },
  newFriend: function (user1, user2, callback) {
    if (user1.id === user2.id) {
      callback(new Error('cannot friend self'));
    } else {
      db.Friends.findAll({where: {$or: [
        {userIdlink1: user1.id,
        userIdlink2: user2.id},
        {userIdlink1: user2.id,
        userIdlink2: user1.id}]}}).then(function(isFriends) {
          if (isFriends.length !== 0) {
            callback(new Error('already friends'), null)
          } else {
            var newFriends = db.Friends.create({
              userIdlink1: user1.id,
              userIdlink2: user2.id
            }).then(function(response) {
              if (callback) {callback(null, response.dataValues)}
            }).catch(function(error) {
              callback(error, null);
            });
          }
        }).catch(function(error) {
          callback(error, null);
        });
      };
  },
  getAllFriends: function(user, callback) {
    db.Friends.findAll({where: {$or: [
      {userIdlink1: user.id},
      {userIdlink2: user.id}
      ]}})
    .then(function(friends){
      var results = [];
      for (var i in friends) {
        results.push(friends[i].dataValues);
      }
      callback(null, results)
    }).catch(function(error) {
      callback(error, null)
    });
  }
};