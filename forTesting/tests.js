var myUsers = require('../server/db/UsersController.js');
var myFriends = require('../server/db/FriendsController.js');
var myGames = require('../server/db/GamesController.js');
var myUsersGames = require('../server/db/UsersGamesController.js')
var fakeUsers = require('../server/db/fakeuser.js');
var db = require('../server/db/db.js');

db.dbConnection.connect();

var friendsCheck = function() {
  myFriends.newFriend({id: 0}, {id: 1}, function(err, response) {
    if (err) {console.log('err1 ', err.message)}
    console.log('0 and 1 friends --- ', response)
    myFriends.newFriend({id: 0}, {id: 2}, function(err, response2) {
      if (err) {console.log('err2 ', err.message)}
      console.log('0 and 2 friends --- ', response2)
      myFriends.getAllFriends({id: 0}, function(err, response3) {
        if (err) {console.log('err3 ', err.message)}
        console.log('get friends of 0 ---- ', response3)
      });
    });
  });
}

var addGames = function() {
  var games = 0;
  for (var i in fakeUsers.games) {
    myGames.addGame(fakeUsers.games[i], function(err, game) {
      if (err) {console.log('addGame error ---- ', err)};
      games++;
      console.log('game --- ', game.dataValues);
      if (games === 3) {
        myUsersGames.addUserGame({id: 0}, {id: 0}, function(err, response) {
          console.log('add user game ---- ', err, response);
        });
      }
    });
  }
}

var users = 0;
for (var i in fakeUsers.users) {
  myUsers.newUser(fakeUsers.users[i], function(data) {
    users++;
    if (users === 4) {
      // friendsCheck();
      // myUsers.updateUser({fbID: '3456', username: 'silonico'}, function(err, response) {
      //   if (err) {console.log('update error ----', err)};
      //   console.log('response', response);
      // });
      // myDB.searchUsers({id: 1}, console.log)
      addGames();
    }
  });
}

db.dbConnection.end();
