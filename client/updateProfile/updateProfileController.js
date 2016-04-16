angular.module('SGN.updateProfile', ['SGN.requests'])
.controller('UpdateProfileController', function ($scope, $location, SGNRequests, $http) {
  $scope.friends = {};
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
      url: '/users/profile'
    }).then(function mySucces(response) {
      $scope.ourID = response.data.id;  //ourID is the id system for OUR DB.
      $scope.username = response.data.username;
      $scope.givenName = response.data.givenName;
      $scope.avatar = response.data.avatar;
      $scope.email = response.data.email;
      $scope.fbID = response.data.fbID;
    }, function myError(response) {
      console.log(response);
    });
  };
  //fetch profile information from STEAMAPI
  $scope.steamFetchProfile = function (steamID) {
    $scope.confirmation = "Is this you?";
    SGNRequests.getSteamProfile($scope.steamID, function (res) {
      var steamData = res.data.response.players[0];
      $scope.steamState = steamData.personastate;
      $scope.steamOnline = $scope.stateConversion[$scope.steamState];
      $scope.steamUsername = steamData.personaname;
      $scope.steamAvatar = steamData.avatarmedium;
    });
    $scope.steamFetchFriends();
  };

  //compiles a list of all steam friends that are on our network.
  $scope.steamFetchFriends = function (steamID) {
    SGNRequests.getSteamFriends($scope.steamID, function (res) {
      var steamFriends = res.data.friendslist.friends;
      for (var i = 0; i < steamFriends.length; i++) {
        var targetAccount = steamFriends[i].steamid;
        SGNRequests.getSteamDBProfile(targetAccount, function (res) {
          if (res.status === 200) {
            $scope.friendsList = [res.data] ||
            $scope.friendsList.push(res.data);
            //fetch friend profile information from steam
            SGNRequests.getSteamProfile(res.data.steamID, function (res) {
              var profile = res.data.response.players[0];
              $scope.friendsProfiles = [profile] ||
              $scope.friendsProfiles.push(profile);
              console.log(res);
            });
          }
        });
      };
    });
  };
  $scope.steamFetchGames = function () {
    var steamID = $scope.steamID;
    SGNRequests.getSteamGames(steamID, function (res) {
      console.log(res);
      $scope.gamesList = res.data.response.games ||
      null;
    });
  };


  //Handels all UPDATES to the database with newly entered information.
  $scope.updateProfile = function () {
    //update 'user' table.
    var userInfo = {
      fbID: $scope.fbID,
      username: $scope.username,
      email: $scope.email,
      givenName: $scope.givenName
    };
    SGNRequests.updateProfile(userInfo);

    //bug: can only update steamaccount once atm, no put request functionality.
    //update 'steam' table.
    var steamAccount = {
      userID: $scope.ourID,
      steamID: $scope.steamID,
      username: $scope.steamUsername,
      avatar: $scope.steamAvatar
    }
    SGNRequests.updateSteamProfile(steamAccount);

    //update 'friends' table.
    if (friends) {
      var friends = $scope.friendsList;
      for (var i = 0; i < friends.length; i++) {
        var userRelation = {
          user1: { id: $scope.ourID },
          user2: { id: friends[i].userID },
        }
        SGNRequests.addFriend(userRelation, function (res) {
          console.log(res);
        });
      }
    }


    //check and add relevant friends on the network to your friends list.
    $location.path('/home');
  };
  //auto populate fields when controller loads.
  $scope.getUserInfo();
});


