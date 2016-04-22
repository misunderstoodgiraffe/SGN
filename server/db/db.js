var mysql = require('mysql');
var SQL = require('sequelize');
var sql = new SQL('SGN', 'root', '1234', {define: {timestamps: false}});

module.exports.dbConnection = mysql.createConnection({
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'b54912934cf718',
  password: '30141162',
  database: 'heroku_6e5b139fb11cc8b',
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

