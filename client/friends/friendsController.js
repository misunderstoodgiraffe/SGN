angular.module('CGN.friends', ['CGN.requests'])
.controller('FriendsController', ($scope, CGNRequests) => {
  $scope.friends = CGNRequests.getFriends();
  console.log($scope.friends);
});
