var mysql = require('mysql');

module.exports.SQL = SQL = require('sequelize');
module.exports.sql = sql = new SQL('users', 'root', 'm1sunderst00d', {define: {timestamps: false}});

module.exports.dbConnection = mysql.createConnection({
  user: 'root',
  password: 'm1sunderst00d',
  database: 'users'
});

module.exports.User = User = sql.define('user', {
  username: SQL.STRING
});

User.sync();