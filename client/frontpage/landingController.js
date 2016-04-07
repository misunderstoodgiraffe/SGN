angular.module('SGN.landing', [])
.controller('LandingController', function ($scope, $location) {
  $scope.threads = {};
  $scope.go = function () {
    $location.path('/new');
  };
})
