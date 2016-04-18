/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var expect = require('chai').expect;
var SQL = require('sequelize');
var sql = new SQL('SGN', 'root', '1234', {define: {timestamps: false}});
var db = require('../../db/db.js');
var GamesController = require('../../db/GamesController.js');

describe('Games Controller', function() {
  var dbConnection;
  db.dbConnection.connect();

  beforeEach(function(done) {
    
    var tablename = 'games'; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */

    sql.query('truncate ' + tablename, { type: sql.QueryTypes.RAW})
    .then(function(result) {
      db.Games.bulkCreate([
        { gameID: '12346', name: 'A game', image: '/link/to/image.jpg', },
        { gameID: '86354', name: 'Another game', image: '/go/to/image.jpg', },
        { gameID: '67347', name: 'Some game', image: 'some/image.jpg', },
        { gameID: '64759', name: 'Guess what? another game!', image: '/another/link/to/image.jpg', },
      ]).then(function() {
        done();
      });

    });




  });

  after(function() {
    db.dbConnection.end();
  });

  it('Get one game from the database', function(done) {
    var game = {gameID: '12346'};
    GamesController.getGame(game, function(error, game) {
      expect(error).to.not.exist;
      expect(game.dataValues.name).to.equal('A game');
      done();
    });

  });

  it('Add a new game to the database', function(done) {
    var game = { gameID: '78543', name: 'Some other game', image: '/some/other/link/to/image.jpg', };
    GamesController.addGame(game, function(error, game) {
      expect(error).to.not.exist;
      expect(game.gameID).to.equal('78543');
      done();
    });

  });





});
