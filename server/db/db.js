var mysql = require('mysql');
var fakeUsers = require('./fakeuser.js');

var SQL = require('sequelize');
var sql = new SQL('SGN', 'root', 'm1sunderst00d', {define: {timestamps: false}});

module.exports.dbConnection = dbConnection = mysql.createConnection({
  user: 'root',
  password: 'm1sunderst00d',
  database: 'users'
});

var Users = sql.define('users', {
  FBid: SQL.INTEGER,
  username: SQL.STRING,
  givenName: SQL.STRING,
  avatar: SQL.STRING,
  lastlogin: SQL.INTEGER
});

var Steam = sql.define('steam', {
  userID: SQL.INTEGER,
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

Users.hasMany(Friends);
Users.hasMany(UsersGames);
Games.hasMany(UsersGames);
Steam.belongTo(Users);
UsersGames.hasOne(Games);
UsersGames.hasOne(Users);
Friends.belongsTo(Users);

// Skeleton code must be refactored for our schema

module.exports.users = users = {
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
};

dbConnection.connect();

var done = 0;
for (var i in fakeUsers.fakeUsers) {
  console.log(fakeUsers.fakeUsers[i])
  users.newUser(fakeUsers.fakeUsers[i], function(stuff){
    done++;
    // console.log(done, stuff);
    if (done === 4) {
      users.getAll(function(users) {
        // console.log(users);
      });
    }
  });
};