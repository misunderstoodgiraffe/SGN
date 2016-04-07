var express = require('express');
var passport = require('passport');
var db = require('./db/db.js');

var app = express();

app.get('/', function (req, res) {
  res.redirect('index.html');
});

// require('./routes.js') (app,express);

app.listen(3000);

module.exports = app;
