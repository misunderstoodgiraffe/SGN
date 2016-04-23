/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var expect = require('chai').expect;
var SQL = require('sequelize');
var sql = new SQL('CGN', 'root', '1234', {define: {timestamps: false}});
var db = require('../../db/db.js');
var UsersController = require('../../db/usersController.js');

describe('Users Controller', function() {
  var dbConnection;
  db.dbConnection.connect();

  beforeEach(function(done) {
    
    var tablename = 'users'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */

     // sql.query('truncate ' + tablename, { type: sql.QueryTypes.RAW})
     //     .then(function(result) {
     //       db.Users.bulkCreate([
     //         { fbID: '123456', username: "Dylanoioioi", givenName: "Dylan Tran", lastlogin: 0},
     //         { fbID: '10154065918644289', username: "SOSOSOSOOfiai", givenName: "I should be number one!", lastlogin: 0 },
     //         { fbID: '3456', username: "anotherUser", givenName: "Im not a number", lastlogin: 0 },
     //         { fbID: '126', username: "JAAAAAAAAAAAAAAAASH", givenName: "I built this shit", lastlogin: 0 }
     //       ]).then(function() {
     //         done();
     //       });

     //     });

     //    });

    sql.transaction(function(t) {
    var options = { raw: true, transaction: t }

    return sql.query('SET FOREIGN_KEY_CHECKS = 0', options)
    .then(function() {
      return sql.query('truncate ' + tablename, options)
    })
    .then(function() {
      return sql.query('SET FOREIGN_KEY_CHECKS = 1', options)
    })
    .then(function(result) {
      db.Users.bulkCreate([
        { fbID: '123456', username: "Dylanoioioi", givenName: "Dylan Tran", lastlogin: 0},
        { fbID: '10154065918644289', username: "SOSOSOSOOfiai", givenName: "I should be number one!", lastlogin: 0 },
        { fbID: '3456', username: "anotherUser", givenName: "Im not a number", lastlogin: 0 },
        { fbID: '126', username: "JAAAAAAAAAAAAAAAASH", givenName: "I built this shit", lastlogin: 0 }
      ]).then(function() {
        done();
      });
    });

  });
  });

  after(function() {
    db.dbConnection.end();
  });

  it('Should get all users in the database', function(done) {
    UsersController.getAllUsers(function(error, users) {
      expect(error).to.not.exist;
      expect(users.length).to.equal(4);
      done();
    });

  });

  it('Should allow for custom queries', function(done) {
    var query = { fbID: '123456', lastlogin: 0, };
    UsersController.searchUsers(query, function(error, users) {
      expect(error).to.not.exist;
      expect(users.length).to.equal(1);
      expect(users[0].givenName).to.equal('Dylan Tran');
      done();
    });

  });

  it('Should add a new user to the database with a unique id', function(done) {
    var newuser = { fbID: '3948596', username: 'Some person', givenName: 'First Last', lastlogin: 0 };
    UsersController.newUser(newuser, function(error, user) {
      expect(error).to.not.exist;
      expect(user.fbID).to.equal('3948596');
      done();
    });

  });

  it('Should throw an error when the new user does not have a unique fbID', function(done) {
    var newuser = { fbID: '123456', username: 'Some person', givenName: 'First Last', lastlogin: 0 };
    UsersController.newUser(newuser, function(error, user) {
      expect(error.message).to.equal('user already exists');
      done();
    });

  });

  it('Should update a user with the given attribues', function(done) {
    var attributes = { fbID: '123456', username: 'a new name!', };
    UsersController.updateProfile(attributes, function(error, user) {
      expect(error).to.not.exist;
      expect(user.username).to.equal('a new name!');
      done();
    });

  });

  it('Should get one user from the database with the given attributes', function(done) {
    var attributes = { fbID: '3456', givenName: 'Changed Name', };
    UsersController.updateProfile(attributes, function(error, user) {
      expect(error).to.not.exist;
      expect(user.givenName).to.equal('Changed Name');
      done();
    });

  });




});
