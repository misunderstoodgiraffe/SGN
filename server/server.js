var express = require('express');
var db = require('./db/db.js');
var bodyParser = require('body-parser');
var OAuth = require('oauthio');
db.dbConnection.connect();

var app = express();

require('./routes.js') (app, express);
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
OAuth.initialize(process.env.OAUTH_APP_KEY, process.env.OATH_SECRET);


app.get('/', function(reg, res, next) {
  // res.redirect('index.html');
});

app.listen(3000);

module.exports = app;
