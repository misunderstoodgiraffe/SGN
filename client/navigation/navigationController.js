angular.module('CGN.navigation', [])
.controller('NavigationController', (facebookService, $scope, $location, $http, $log) => {
  $scope.threads = {};
  $scope.friends = {};
  facebookService.initialize();

  // for now, is used to get profile pic and username from database.
  $scope.getUserInfo = () => {
    $http({
      method: 'GET',
      url: '/api/me/profile',
    }).then((response) => {
      $scope.username = response.data.username;
      $scope.givenName = response.data.givenName;
      $scope.avatar = response.data.avatar;
    }, (error) => {
      $log.log(error);
    });
  };

  // sign out clears the OAuth cache, the user will have to reauthenticate when returning
  $scope.signOut = function signOut() {
    facebookService.clearCache();
    $scope.friends.length = 0;
    angular.element('#getTimelineButton, #signOut').fadeOut(() => {
      angular.element('#connectButton').fadeIn();
    });
  };
  $scope.getUserInfo();
});
