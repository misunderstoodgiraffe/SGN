angular.module('CGN.navigation', [])
.controller('NavigationController', ($scope, $location, $http, $log) => {
  $scope.threads = {};
  $scope.friends = {};

  // for now, is used to get profile pic and username from database.
  $scope.getUserInfo = () => {
    $http({
      method: 'GET',
      url: '/api/me/profile',
    }).then((response) => {
      $scope.username = response.data.username;
      $scope.givenName = response.data.givenName;
      $scope.avatar = response.data.avatar;
    }, (error) => {
      $log.log(error);
    });
  };
  $scope.getUserInfo();
});
