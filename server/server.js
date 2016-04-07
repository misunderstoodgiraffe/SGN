var express = require('express');
var db = require('./db/db.js');

var app = express();

// require('./routes.js') (app,express);

app.listen(3000);

module.exports = app;
