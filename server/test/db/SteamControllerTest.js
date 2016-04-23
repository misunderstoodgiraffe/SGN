/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var expect = require('chai').expect;
var SQL = require('sequelize');
var sql = new SQL('CGN', 'root', '1234', {define: {timestamps: false}});
var db = require('../../db/db.js');
var SteamController = require('../../db/SteamController.js');

describe('Steam Controller', function() {
  var dbConnection;
  db.dbConnection.connect();

  beforeEach(function(done) {
    
    var tablename = 'steam'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */

    sql.query('truncate ' + tablename, { type: sql.QueryTypes.RAW})
    .then(function(result) {
      db.Steam.bulkCreate([
        { userID: '42940', steamID: '144503872034', username: 'Bob', avatar: 'some/path.jpg'},
        { userID: '97230', steamID: '173638409501', username: 'Mary', avatar: 'a/path.jpg'},
        { userID: '86302', steamID: '902746586049', username: 'Josh', avatar: 'another/path.jpg'},
      ]).then(function() {
        done();
      });

    });


  });

  after(function() {
    db.dbConnection.end();
  });

  it('Add a new entry the steam database', function(done) {
    var account = { userID: '857687', steamID: '9034672947', username: 'Sofia', avatar: 'this/is/a/path.jpg'};
    SteamController.addSteam(account, function(error, account) {
      expect(error).to.not.exist;
      expect(account.steamID).to.equal('9034672947');
      done();
    });
  });

  it('Get one steam account from the database with the given attributes', function(done) {
    var account = { userID: '97230', steamID: '173638409501' };
    SteamController.getSteam(account, function(error, account) {
      expect(error).to.not.exist;
      expect(account.username).to.equal('Mary');
      done();
    });
  });






});
