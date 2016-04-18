var expect = require('chai').expect;
var SQL = require('sequelize');
var sql = new SQL('SGN', 'root', '1234', {define: {timestamps: false}});
var db = require('../../db/db.js');
var UsersController = require('../../db/UsersController.js');
var GamesController = require('../../db/GamesController.js');

describe('Users\'s Games Controller', function() {
  var dbConnection;
  db.dbConnection.connect();

  beforeEach(function(done) {
    
    var tablename = 'usersGames'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */

    sql.query('truncate games', { type: sql.QueryTypes.RAW})
    .then(function(result) {
      sql.query('truncate users', { type: sql.QueryTypes.RAW})
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

  it('Should create a new entry in the Friends table', function(done) {
    UsersController.getOneUser({fbID: '123456'}, function(error, firstUser) {
      UsersController.getOneUser({fbID: '10154065918644289'}, function(error, secondUser) {
        FriendsController.newFriend(firstUser, secondUser, function(error, result) {
          expect(error).to.not.exist;
          expect(result.userIdlink1).to.equal(1);
          expect(result.userIdlink2).to.equal(2);
          done();
        });
      });
    });

  });

  it('Should throw an error if the user friends himself', function(done) {
    UsersController.getOneUser({fbID: '123456'}, function(error, firstUser) {
      UsersController.getOneUser({fbID: '123456'}, function(error, secondUser) {
        FriendsController.newFriend(firstUser, secondUser, function(error, result) {
          expect(error.message).to.equal('cannot friend self');
          done();
        });
      });
    });

  });

  it('Should retrive a user\'s friends from the friend table', function(done) {
    UsersController.getOneUser({fbID: '123456'}, function(error, firstUser) {
      UsersController.getOneUser({fbID: '126'}, function(error, secondUser) {
        UsersController.getOneUser({fbID: '3456'}, function(error, thirdUser) {
          FriendsController.newFriend(firstUser, secondUser, function(error, result) {
            FriendsController.newFriend(firstUser, thirdUser, function(error, result2) {
              FriendsController.getAllFriends(firstUser, function(error, friends) {
                expect(friends.length).to.equal(2);
                done();
              });
            });
          });
        });
      });
    });

  });




});
