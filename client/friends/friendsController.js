angular.module('CGN.friends', [])
.controller('FriendsController', (facebookService, $scope, $location, $http, $log) => {
  $log.log('Were in the friends controller!');
});
