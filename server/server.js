var express = require('express');
var db = require('./db/db.js');
var bodyParser = require('body-parser');
db.dbConnection.connect()

var app = express();

// require('./routes.js') (app,express);
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/');

app.listen(3000);

module.exports = app;
