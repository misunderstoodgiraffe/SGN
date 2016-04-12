angular.module('SGN.updateProfile', ['SGN.requests'])
.controller('UpdateProfileController', function ($scope, $location, SGNRequests) {
  $scope.friends = {};
  $scope.updateProfile = function () {
    var userInfo = {
      username: $scope.username,
      steamID: $scope.steamID,
      blizzardID: $scope.blizzardID,
      description: $scope.description,
    };
    SGNRequests(userInfo);
    $location.path('/home');
  };
});


