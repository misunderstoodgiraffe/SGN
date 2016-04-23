const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('./db/db.js');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
require('./routes.js')(app, express);
app.use(express.static(__dirname + '/../dist'));

app.listen(process.env.PORT || 3000);
console.log("CGN Server is now listening");

module.exports = app;
