const express = require('express');
const cors = require('cors');
const session = require('express-session');
// const db = require('./db/db.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// db.dbConnection.connect();

app.use(cors());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
// require('./config/routes.js') (app, express);
app.use(express.static(__dirname + '/../client'));

app.listen(process.env.PORT || 3000);
console.log("CGN Server is now listening");

module.exports = app;
