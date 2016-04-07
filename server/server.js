var express = require('express');
var passport = require('passport');
var db = require('./db/db.js');

var app = express();

require('db/db.js') (app, express);
require('routes.js') (app,express);

app.listen(3000);

module.exports = app;