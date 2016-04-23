var db = require('../db/db.js');

module.exports = {
  addSteam: function(account, callback) {
    var newSteam = db.Steam.create(account)
    .then(function(data) {
      callback(null, data.dataValues);
    }).catch(function(error) {
      if (error.errors) {
        if (error.errors[0].message === 'steamID must be unique') {
          callback(new Error('account already exists'), null);
        } else {callback(error, null)}
      } else {callback(error, null)}
    });
  },
  getSteam: function(account, callback) {
    db.Steam.findOne({where: account}).then(function(item) {
      callback(null, item.dataValues);
      // callback(null, account.dataValues);
    }).catch(function(err) {
      callback(err, null);
    })
  }
};
