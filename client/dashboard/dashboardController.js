angular.module('SGN.dashboard', [])
.controller('DashboardController', function (facebookService, $scope, $location, SGNRequests) {
  $scope.friends = {};
  $scope.getUserFriends = function () {
    console.log('calling getUserFriends');
    SGNRequests.getFriends(function (res) {
      $scope.friends = res.data;
      console.log(res.data);
    });
  }
  $scope.getUserFriends();
});


