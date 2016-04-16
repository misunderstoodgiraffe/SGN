/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;
var SQL = require('sequelize');
var sql = new SQL('SGN', 'root', '1234', {define: {timestamps: false}});
var db = require('../../db/db.js');
var UsersController = require('../../db/usersController.js');

describe('Users Controller', function() {
  var dbConnection;

  beforeEach(function(done) {
    db.dbConnection.connect();

    var tablename = 'users'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */

    var users = {
      dylan: {
        fbID: '123456',
        username: "Dylanoioioi",
        givenName: "Dylan Tran",
        lastlogin: 0
      },
      sofia: {
        fbID: '10154065918644289',
        username: "SOSOSOSOOfiai",
        givenName: "I should be number one!",
        lastlogin: 0
      },
      wilson: {
        fbID: '3456',
        username: "anotherUser",
        givenName: "Im not a number",
        lastlogin: 0
      },
      josh: {
        fbID: '126',
        username: "JAAAAAAAAAAAAAAAASH",
        givenName: "I built this shit",
        lastlogin: 0
      }
    };

    sql.query('truncate ' + tablename, { type: sql.QueryTypes.RAW})
    .then(function(result) {
      db.Users.bulkCreate([
        { fbID: '123456', username: "Dylanoioioi", givenName: "Dylan Tran", lastlogin: 0},
        { fbID: '10154065918644289', username: "SOSOSOSOOfiai", givenName: "I should be number one!", lastlogin: 0 },
      ]).then(function() { // Notice: There are no arguments here, as of right now you'll have to...
        done();
      });

    });




  });

  afterEach(function() {
    db.dbConnection.end();
  });

  it('Should get all users in the database', function(done) {
    UsersController.getAllUsers(function(error, users) {
      console.log('these are the users', users);
      expect(error).to.not.exist;
      done();
    });

  });


});
