angular.module('SGN.updateProfile', ['SGN.requests'])
.controller('UpdateProfileController', function ($scope, $location, SGNRequests) {
  $scope.friends = {};
  $scope.updateProfile = function () {
    var userInfo = {
      username: $scope.username,
      email: $scope.email,
      description: $scope.description,
      steamID: $scope.steamID
    };
    SGNRequests.updateProfile(userInfo);
    $location.path('/home');
  };
  $scope.steamFetch = function (steamID) {
    $scope.confirmation = "Is this your information?";
    $scope.steamData = SGNRequests.updateSteamProfile($scope.steamID);
    $scope.sID = $scope.steamData.sID;
    $scope.username = $scope.steamData.username;
    $scope.avatar = $scope.steamData.avatar;
  };
});


