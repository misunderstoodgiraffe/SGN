var db = require('./db/db.js');

module.exports = {
  checkAuth: function(){},
  signup: function(){},
  signin: function(req, res, next) {
    console.log("getting here");
    return res.json({data: "Some data"});
  },
  addUser: function() {},
  getFriends: function(){}
}