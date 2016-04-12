var mysql = require('mysql');
var SQL = require('sequelize');
var sql = new SQL('SGN', 'root', '1234', {define: {timestamps: false}});

module.exports.dbConnection = mysql.createConnection({
  user: 'root',
  password: '1234',
  database: 'SGN'
});

module.exports.Users = Users = sql.define('users', {
  fbID: {type: SQL.STRING,
    unique: true},
  username: SQL.STRING,
  givenName: SQL.STRING,
  avatar: SQL.STRING,
  lastlogin: SQL.INTEGER
});

module.exports.Steam = Steam = sql.define('steam', {
  steamID: {type: SQL.STRING,
    unique: true},
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

module.exports.UsersGames = UsersGames = sql.define('usersGames', {});

Users.hasMany(Friends, {as: 'userIdlink1'});
Users.hasMany(Friends, {as: 'userIdlink2'});
Users.hasMany(UsersGames);
Games.hasMany(UsersGames);
Users.hasOne(Steam);

Users.sync();
Games.sync();
Steam.sync();
Friends.sync();
UsersGames.sync();