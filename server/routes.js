var userController = require('./controller.js');
var OAuth = require('oauthio');
OAuth.initialize('1730910463787032', '5b60ffc112a534c146203c0da965ebae');

module.exports = function (app, express) {
  app.get('/oauth/redirect', OAuth.redirect(function(result, req, res) {
    res.json({data: "some facebook data"});
  }));
  app.get('/signin', OAuth.auth('facebook', 'http://localhost:3000/oauth/redirect'));

};