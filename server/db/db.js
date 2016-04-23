var mysql = require('mysql');
var SQL = require('sequelize');
var sql = new SQL('CGN', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
});


module.exports.Users = Users = sql.define('users', {
  fbID: {type: SQL.STRING,
    unique: true},
  steamID: SQL.STRING,
  username: SQL.STRING,
  email: SQL.STRING,
  givenName: SQL.STRING,
  avatar: SQL.STRING,
  lastlogin: SQL.INTEGER
});

module.exports.Steam = Steam = sql.define('steam', {
  userID: {type: SQL.INTEGER,
    unique: true},
  steamID: {type: SQL.STRING,
    unique: true},
  location: SQL.STRING,
  bio: SQL.STRING,
  username: SQL.STRING,
  avatar: SQL.STRING
});

module.exports.Friends = Friends = sql.define('friends', {
  userIdlink1: SQL.INTEGER,
  userIdlink2: SQL.INTEGER
});

module.exports.Games = Games = sql.define('games', {
  gameID: {type: SQL.STRING,
    unique: true},
  name: SQL.STRING,
  image: SQL.STRING
});

module.exports.UsersGames = UsersGames = sql.define('usersGames', {
  userID: SQL.INTEGER,
  gameID: SQL.INTEGER
});


// Friends.belongsTo(Users, {foreignKey: 'userIdlink1', foreignKeyConstraint: true});
// Friends.belongsTo(Users, {foreignKey: 'userIdlink2', foreignKeyConstraint: true});
// Users.hasMany(UsersGames);
// Games.hasMany(UsersGames);
// Users.hasOne(Steam);

Users.sync();
Games.sync();
Steam.sync(/*{force: true}*/);
Friends.sync(/*{force: true}*/);
UsersGames.sync(/*{force: true}*/);
