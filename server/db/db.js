var mysql = require('mysql');

module.exports.SQL = SQL = require('sequelize');
module.exports.sql = sql = new SQL('users', 'root', 'm1sunderst00d', {define: {timestamps: false}});

module.exports.dbConnection = mysql.createConnection({
  user: 'root',
  password: 'm1sunderst00d',
  database: 'users'
});

module.exports.Users = Users = sql.define('users', {
  username: SQL.STRING
});

module.exports.Friends = Friends = sql.define('friends', {
  userIdlink1: SQL.INT,
  userIdlink2: SQL.INT
})

User.sync();
Frinends.sync();

module.exports.users = {
    getAll: function (callback) {
      db.User.findAll().then(callback);
    },
    search: function (callback) {
      db..findAll({include: [{
        model: db.User,
        where: {userId: db.SQL.col('Message.userId')}
      }]}).then(function(result) {
        var newResult = [];
        for (var i in result) {
          var username = result[i].dataValues.user.dataValues.username;
          var newMessage = result[i].dataValues;
          newMessage['username'] = username;
          delete newMessage['user'];
          newResult.push(newMessage);
        }
        
        callback(newResult);
      });
    },
    newUser: function (user, callback) {
      var newUser = db.User.build(user);
      newUser.save().success(callback);
    }, // a function which produces all the messages
    newFriend: function (user, callback) {
      db.User.findAll({where: {username: message['username']}}).then( function(result) {
        if (result.length === 0) {
          var newUser = db.User.build({username: message['username']});
          newUser.save().then(function(saveResults) {
            postMessage(message, [{userId: saveResults.dataValues.id}], callback);
          });
        } else {
          console.log(result);
          postMessage(message, result, callback);
        }
      }); 
    },
    searchFriends: function(callback) {}
  }
};