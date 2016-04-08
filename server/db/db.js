var mysql = require('mysql');

var SQL = require('sequelize');
var sql = new SQL('users', 'root', 'm1sunderst00d', {define: {timestamps: false}});

module.exports.dbConnection = mysql.createConnection({
  user: 'root',
  password: 'm1sunderst00d',
  database: 'users'
});

var User = sql.define('user', {
  FBid: SQL.INTEGER,
  username: SQL.STRING,
  givenName: SQL.STRING,
  steamID: SQL.INTEGER,
  lastlogin: SQL.INTEGER
});

var Steam = sql.define('steam', {
  Sid: SQL.INTEGER,
  username: SQL.STRING,
  avatar: SQL.STRING
});

var Friends = sql.define('friends', {
  userIdlink1: SQL.INTEGER,
  userIdlink2: SQL.INTEGER
});

var Games = sql.define('games', {
  gameID: SQL.INTEGER,
  name: SQL.STRING,
  image: SQL.STRING
});

var UsersGames = sql.define('usersGames', {
  userID: SQL.INTEGER,
  gameID: SQL.INTEGER
});

User.hasMany(Friends);
User.hasMany(UsersGames);
Games.hasMany(UsersGames);
User.hasOne(Steam);
UsersGames.hasOne(Games);
UsersGames.hasOne(User);
Friends.belongsTo(User);

// Skeleton code must be refactored for our schema

module.exports.users = users = {
  getAll: function (callback) {
    User.findAll().then(callback);
  },
  search: function (query, callback) {
    User.findAll({include: [{
      model: User,
      where: query // {userId: db.SQL.col('Message.userId')}
    }]}).then(function(result) {        
      callback(result);
    });
  },
  newUser: function (user, callback) {
    var newUser = User.build(user);
    console.log(newUser);
    newUser.save().then(callback);
  }, // a function which produces all the messages
  newFriend: function (user1, user2, callback) {
    var newFriends = Friends.build({
      userIdlink1: user1.id,
      userIdlink2: user2.id
    })
    newFriends.save().then(callback);
  },
  searchFriends: function(callback) {}
}
