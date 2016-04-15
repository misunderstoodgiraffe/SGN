angular.module('SGN.updateProfile', ['SGN.requests'])
.controller('UpdateProfileController', function ($scope, $location, SGNRequests, $http) {
  $scope.friends = {};
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
      console.log(res);
      var steamData = res.data.response.players[0];
      $scope.steamUsername = steamData.personaname;
      $scope.steamAvatar = steamData.avatarmedium;
    });
  };


  $scope.steamFetchFriends = function (steamID) {
    SGNRequests.getSteamFriends($scope.steamID, function (res) {
      var steamFriends = res.data.friendslist.friends;
      console.log(steamFriends.length);
      for (var i = 0; i < steamFriends.length; i++) {
        var targetAccount = steamFriends[i].steamid;
        console.log(targetAccount);
        SGNRequests.getSteamDBProfile(targetAccount, function (res) {
          if (res.status === 200) {
            $scope.friendsList = [res.data] ||
            $scope.friendsList.push(res.data);
          }
        });
      };
    });

    //compile a list of all friends on the network based on steamID.
  };


  //UPDATE the database with newly entered information.
  $scope.updateProfile = function () {
    var userInfo = {
      fbID: $scope.fbID,
      username: $scope.username,
      email: $scope.email,
      givenName: $scope.givenName
    };
    SGNRequests.updateProfile(userInfo);

    //bug: can only update steamaccount once atm,
    //no put request functionality.
    var steamAccount = {
      userID: $scope.ourID,
      steamID: $scope.steamID,
      username: $scope.steamUsername,
      avatar: $scope.steamAvatar
    }
    SGNRequests.updateSteamProfile(steamAccount);
    // SGNRequests

    //check and add relevant friends on the network to your friends list.
    $location.path('/home');
  };
  //auto populate fields when controller loads.
  $scope.getUserInfo();
});


