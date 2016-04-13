angular.module('SGN.profile', ['SGN.requests'])
.controller('ProfileController', function ($scope, $location, SGNRequests) {
  $scope.friends = {};
});