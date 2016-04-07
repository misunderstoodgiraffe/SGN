//server/config/auth.js

//Keys to access facebook's api
//Used to configure passport

exports.facebookAuth = {
  'clientID': '1730910463787032', // your App ID
  'clientSecret': '5b60ffc112a534c146203c0da965ebae', // your App Secret
  'callbackURL': 'http://localhost:3000/auth/facebook/callback'
};