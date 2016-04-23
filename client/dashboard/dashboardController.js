angular.module('CGN.dashboard', [])
.controller('DashboardController', function ($scope, $location, CGNRequests) {
  $scope.friends = {};
  $scope.games = {};
  $scope.getUserFriends = function () {
    console.log('calling getUserFriends');
    CGNRequests.getFriends(function (res) {
      $scope.friends = res.data;
      console.log(res.data);
    });
  }
  $scope.getUserFriends();

  $scope.getGames = function() {
    CGNRequests.getSteamGames(null, function(games) {
      $scope.games = games;
    });
  }
  $scope.getGames();
});
