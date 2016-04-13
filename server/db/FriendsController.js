var db = require('./db.js');

module.exports = {
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