angular.module('SGN.dashboard', [])
.controller('DashboardController', function (facebookService, $scope, $location) {
  $scope.threads = {};
  $scope.go = function () {
    $location.path('/new');
  };
});


