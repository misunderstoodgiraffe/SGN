var db = require('./db.js');

module.exports = {
  getAllUsers: function (callback) {
    db.Users.findAll().then(function(data) {
      var results = [];
      for (var i in data) {
        results.push(data[i].dataValues);
      }
      callback(null, results);
    }).catch(function(error) {
      callback(error, null);
    });
  },
  searchUsers: function (query, callback) {
    db.Users.findAll({where: query})
      .then(function(result) {
        var results = [];
        for (var i in result) {
          results.push(result[i].dataValues);
        }
        callback(null, results);
    }).catch(function(error) {
      callback(error, null);
    });
  },
  newUser: function (user, callback) {
    var newUser = db.Users.create(user)
    .then(function(data) {
      callback(null, data.dataValues);
    }).catch(function(error) {
      if (error.errors) {
        if (error.errors[0].message === 'fbID must be unique') {
          db.Users.findOne({where: {fbID: user.fbID}})
          .then(function(myUser) {
          callback(new Error('user already exists'), myUser);
            }).catch(function(err) {callback(err, null)})
        } else {callback(error, null)}
      } else {callback(error, null)}
    });
  },
  updateProfile: function (attributes, callback) {
    db.Users.findOne({where: {fbID: attributes.fbID}})
    .then(function(user) {
      user.update(attributes).then(function(result) {
        callback(null, result.dataValues);
      }).catch(function(error) {
        callback(error, null);
      });
    }).catch(function(error) {
      callback(error, null);
    });
  },
  getOneUser: function (user, callback) {
    db.Users.findOne({where: user})
    .then(function(foundUser) {
      var returnUser = null;
      if (foundUser) {
        returnUser = foundUser.dataValues;
      }
      callback(null, returnUser);
    }).catch(function(err) {
      callback(err, null);
    });
  }
};
