var mysql = require('mysql');

var SQL = require('sequelize');
var sql = new SQL('users', 'root', 'm1sunderst00d', {define: {timestamps: false}});

var dbConnection = mysql.createConnection({
  user: 'root',
  password: 'm1sunderst00d',
  database: 'users'
});

var Users = sql.define('users', {
  username: SQL.STRING
});

var Friends = sql.define('friends', {
  userIdlink1: SQL.INT,
  userIdlink2: SQL.INT
})

User.sync();
Frinends.sync();

// Skeleton code must be refactored for our schema

module.exports.users = {
    getAll: function (callback) {
      Users.findAll().then(callback);
    },
    search: function (query, callback) {
      Users.findAll({include: [{
        model: Users,
        where: query // {userId: db.SQL.col('Message.userId')}
      }]}).then(function(result) {        
        callback(result);
      });
    },
    newUser: function (user, callback) {
      var newUser = Users.build(user);
      newUser.save().success(callback);
    }, // a function which produces all the messages
    newFriend: function (user1, user2, callback) {
      var newFriends = Friends.build({
        userIdlink1: user1.id,
        userIdlink2: user2.id
      })
      newFriends.save().success(callback);
    },
    searchFriends: function(callback) {}
  }
