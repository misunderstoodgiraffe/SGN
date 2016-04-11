angular.module('SGN.profile', [])
.controller('ProfileController', function ($scope, $location) {
  $scope.friends = {};
  $scope.go = function () {
    $location.path('/new');
  };
});


