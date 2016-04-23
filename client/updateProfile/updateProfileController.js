var escapeHTML = function(str) {
 var div = document.createElement('div');
 div.appendChild(document.createTextNode(str));
 return div.innerHTML;
};


angular.module('CGN.updateProfile', ['CGN.requests'])
.controller('UpdateProfileController', function ($scope, $location, CGNRequests, $http) {
  $scope.friends = {};
  //Steam status number to string state conversion.
  $scope.stateConversion = [
  'Offline',
  'Online',
  'Busy',
  'Away',
  'Snooze',
  'looking to trade',
  'looking to play.'
  ];
  //fetch profile information from the DATABASE
  $scope.getUserInfo = function () {
    $http({
      method: 'GET',
      url: '/api/me/profile'
    }).then(function mySucces(response) {
      $scope.cgnID = response.data.id;  //cgnID is the id system for OUR DB.
      $scope.username = response.data.username;
      $scope.givenName = response.data.givenName;
      $scope.avatar = response.data.avatar;
      $scope.email = response.data.email;
      $scope.fbID = response.data.fbID;
      $scope.steamID = response.data.steamID;

      if($scope.steamID !== '') {
        $scope.steamFetchProfile($scope.steamID);
      }
    }, function myError(response) {
      console.log(response);
    });
  };
  //fetch profile information from STEAMAPI
  $scope.steamFetchProfile = function (steamID) {
    CGNRequests.getSteamProfile($scope.steamID, function (res) {
      var steamData = res.data.response.players[0];
      $scope.steamState = steamData.personastate;
      $scope.steamOnline = $scope.stateConversion[$scope.steamState];
      $scope.steamUsername = steamData.personaname;
      $scope.steamAvatar = steamData.avatarmedium;
    });
    $scope.steamFetchFriends();
    $scope.steamFetchGames();

  };

  //compiles a list of all steam friends that are on our network.
  $scope.steamFetchFriends = function (steamID) {
    $scope.friendsList = [];
    $scope.friendsProfiles = [];
    CGNRequests.getSteamFriends($scope.steamID, function (res) {
      var steamFriends = res.data.friendslist.friends;
      for (var i = 0; i < steamFriends.length; i++) {
        // (function() {
          var targetAccount = steamFriends[i].steamid;
          CGNRequests.getSteamDBProfile(targetAccount, function (res) {
            if (res.status === 200) {
              $scope.friendsList.push(res.data);
              //fetch friend profile information from steam
              CGNRequests.getSteamProfile(res.data.steamID, function (res) {
                var profile = res.data.response.players[0];
                $scope.friendsProfiles.push(profile);
              });
            }
          });
        // })();
      };
    });
  };
  $scope.steamFetchGames = function () {
    var steamID = $scope.steamID;
    $scope.gamesList = [];
    $scope.topTen = [];
    var gameIDs;
    CGNRequests.getSteamGames(steamID, function (res) {
      gameIDs = res.data.response.games ||
      null;
    }).then(function () {
      if (gameIDs) {
        gameIDs.sort(function (a, b) {
          return b.playtime_forever - a.playtime_forever;
        });
        var numberOfGames = gameIDs.length > 20 ? 20: gameIDs.length;
        for (var i = 0; i < numberOfGames; i++) {
          //put into an IIFE to fix appid bug
          (function() {
          var game = gameIDs[i];
          CGNRequests.getGameInfo(game.appid, function(res) {
            $scope.gamesList.push(res.data[game.appid].data);
            if ($scope.topTen.length < 10) {
              $scope.topTen.push(res.data[game.appid].data);
            }
          });
          })();
        }
      }
    });
  };

  // id INT AUTO_INCREMENT PRIMARY KEY,
  // gameID VARCHAR(255) NOT NULL UNIQUE,
  // name VARCHAR(255),
  // image VARCHAR(255)

  $scope.saveGames = function () {
    var gamesList = $scope.gamesList;
    for (var i = 0; i < gamesList.length; i++) {
      //create game object
      var game = {
        image: gamesList[i].header_image,
        gameID: gamesList[i].steam_appid,
        name: gamesList[i].name
      };
      CGNRequests.addDBSteamGame(game, function(res) {
        console.log(res);
      });
    }
  };

  $scope.saveUserGameRelation = function () {
    var gamesList = $scope.gamesList;
    for (var i = 0; i < gamesList.length; i++) {
      var gameAndUser = {
        user: {id: $scope.cgnID},
        game: gamesList[i],
      }
      CGNRequests.addUserGameRelation(gameAndUser, function(res) {
      });
    }
  };

  //Handels all UPDATES to the database with newly entered information.
  $scope.updateProfile = function () {
    //update 'user' table.
    var userInfo = {
      fbID: $scope.fbID,
      username: escapeHTML($scope.username),
      email: escapeHTML($scope.email),
      givenName: escapeHTML($scope.givenName),
      steamID: escapeHTML($scope.steamID)
    };

    CGNRequests.updateProfile(userInfo);

    //bug: can only update steamaccount once atm, no put request functionality.
    //update 'steam' table.
    var steamAccount = {
      userID: $scope.cgnID,
      steamID: escapeHTML($scope.steamID),
      username: $scope.steamUsername,
      avatar: $scope.steamAvatar,
      bio: $scope.bio,
    };
    CGNRequests.updateSteamProfile(steamAccount);

    //update 'friends' table.
    var friends = $scope.friendsList;
    if (friends) {
      for (var i = 0; i < friends.length; i++) {
        var userRelation = {
          user1: { id: $scope.cgnID },
          user2: { id: friends[i].userID },
        };
        CGNRequests.addFriend(userRelation, function (res) {
        });
      }
    }


    //check and add relevant friends on the network to your friends list.
    $location.path('/profile');
  };


  $scope.saveGameData = function () {
    $scope.saveUserGameRelation();
    $scope.saveGames();
  };





  //auto populate fields when controller loads.
  $scope.getUserInfo();
});
