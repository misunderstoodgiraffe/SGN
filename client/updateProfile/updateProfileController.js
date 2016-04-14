angular.module('SGN.updateProfile', ['SGN.requests'])
.controller('UpdateProfileController', function ($scope, $location, SGNRequests, $http) {
  $scope.friends = {};
  $scope.getUserInfo = function () {
    $http({
      method: 'GET',
      url: '/users/profile'
    }).then(function mySucces(response) {
      console.log(response);
      $scope.username = response.data.username;
      $scope.givenName = response.data.givenName;
      $scope.avatar = response.data.avatar;
      $scope.email = response.data.email;

    }, function myError(response) {
    });
  }

  $scope.updateProfile = function () {
    var userInfo = {
      username: $scope.username,
      email: $scope.email,
      givenName: $scope.givenName
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

  //auto populate fields;
  $scope.getUserInfo();
});


