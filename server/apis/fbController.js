var db = require('../db/db.js');

module.exports = {
  getFacebookData: function(req, res) {
    res.json({data: "this will be the user data"});
  },
}