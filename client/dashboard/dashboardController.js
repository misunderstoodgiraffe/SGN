angular.module('SGN.dashboard', [])
.controller('DashboardController', function (facebookService, $scope, $location) {
  $scope.friends = {};
  $scope.go = function () {
    $location.path('/new');
  };
});


