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
    $scope.confirmation = "Is this your information?";
    $scope.steamData;
    SGNRequests.updateSteamProfile($scope.steamID, function (res) {
      console.log(res);
      var steamData = res.data.response.players[0];
      $scope.steamUsername = steamData.personaname;
      $scope.steamAvatar = steamData.avatarmedium;
    });

    // $scope.sID = $scope.steamData.sID;
    // $scope.username = $scope.steamData.username;
    // $scope.avatar = $scope.steamData.avatar;
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
    $location.path('/home');
  };
  //auto populate fields when controller loads.
  $scope.getUserInfo();
});


