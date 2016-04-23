angular.module('CGN.recentGames', ['CGN.requests'])
.controller('RecentGamesController', ($scope, CGNRequests) => {
  $scope.games;
  CGNRequests.getDBSteamGame()
    .then((games) => {
      $scope.games = games;
    });
});
