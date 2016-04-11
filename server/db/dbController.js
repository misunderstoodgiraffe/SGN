var db = require('./db.js');

module.exports = {
  getAllUsers: function (callback) {
    db.Users.findAll().then(callback);
  },
  search: function (query, callback) {
    db.Users.findAll({include: [{
      model: db.Users,
      where: query // {userId: db.SQL.col('Message.userId')}
    }]}).then(function(result) {        
      callback(result);
    });
  },
  newUser: function (user, callback) {
    var newUser = db.Users.build(user);
    newUser.save().then(callback);
  },
  newFriend: function (user1, user2, callback) {
    var newFriends = db.Friends.build({
      userIdlink1: user1.id,
      userIdlink2: user2.id
    })
    newFriends.save().then(callback);
  },
  getFriends: function(user, callback) {
    db.Fiends.findAll({where: {userIdlink1: user.id, userIdlink2: user.id}})
    .then(callback);
  }
};