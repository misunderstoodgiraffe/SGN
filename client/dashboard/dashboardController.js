angular.module('SGN.dashboard', [])
.controller('DashboardController', function (facebookService, $scope, $location, SGNRequests) {
  $scope.friends = {};
  $scope.games = {};
  $scope.getUserFriends = function () {
    console.log('calling getUserFriends');
    SGNRequests.getFriends(function (res) {
      $scope.friends = res.data;
      console.log(res.data);
    });
  }
  $scope.getUserFriends();

  $scope.getGames = function() {
    SGNRequests.getSteamGames(null, function(games) {
      $scope.games = games;
    });
  }
  $scope.getGames();
});


