angular.module('CGN.landing', [])
.controller('LandingController', ($scope, $location, $http, $log) => {
  $scope.threads = {};
  $scope.friends = {};

  $scope.getUserInfo = () => {
    $http({
      method: 'GET',
      url: '/api/me/profile',
    }).then((response) => {
      $scope.id = response.data.id;
      $scope.username = response.data.username;
      $scope.givenName = response.data.givenName;
      $scope.avatar = response.data.avatar;
      $scope.email = response.data.email;
      $scope.fbID = response.data.fbID;
    }, (error) => {
      $log.log(error);
    });
  };
  $scope.getUserInfo();
});
