var express = require('express');
cors = require('cors');
var session = require('express-session');
var db = require('./db/db.js');
var bodyParser = require('body-parser');
db.dbConnection.connect();

var app = express();

app.use(cors());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
require('./config/routes.js') (app, express);
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', function(reg, res, next) {
  // res.redirect('index.html');
});

app.listen(3000);

module.exports = app;
