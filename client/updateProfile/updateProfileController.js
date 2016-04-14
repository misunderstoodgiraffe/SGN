angular.module('SGN.updateProfile', ['SGN.requests'])
.controller('UpdateProfileController', function ($scope, $location, SGNRequests, $http) {
  $scope.friends = {};
  //fetch profile information from the DATABASE
  $scope.getUserInfo = function () {
    $http({
      method: 'GET',
      url: '/users/profile'
    }).then(function mySucces(response) {
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
  $scope.steamFetch = function (steamID) {
    $scope.confirmation = "Is this you?";
    SGNRequests.updateSteamProfile($scope.steamID, function (res) {
      console.log(res);
      var steamData = res.data.response.players[0];
      $scope.steamUsername = steamData.personaname;
      $scope.steamAvatar = steamData.avatarmedium;
    });
  };


  $scope.steamFetchFriends = function (steamID) {
    SGNRequests.updateSteamFriends($scope.steamID, function (res) {
      var steamFriends = res.data.friendslist;
      console.log(steamFriends);
      $scope.friendsList = steamFriends;
    });
  };
  //UPDATE the database with newly entered information.
  $scope.updateProfile = function () {
    var userInfo = {
      fbID: $scope.fbID,
      username: $scope.username,
      email: $scope.email,
      givenName: $scope.givenName
    };
    // id INT AUTO_INCREMENT PRIMARY KEY,
    // userID INT NOT NULL UNIQUE,
    // steamID VARCHAR(255) NOT NULL UNIQUE,
    // username VARCHAR(255),
    // avatar VARCHAR(255)

    SGNRequests.updateProfile(userInfo);
    $location.path('/home');
  };
  //auto populate fields when controller loads.
  $scope.getUserInfo();
});


