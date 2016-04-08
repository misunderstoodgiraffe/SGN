angular.module('SGN.landing', [])
.controller('LandingController', function (facebookService, $scope, $location) {
  $scope.threads = {};
  $scope.friends = {};
  facebookService.initialize();

  //when the user clicks the connect twitter button, the popup authorization window opens
  // $scope.connectButton = function(event) {
  //   console.log("clicking button");
  //   event.preventDefault(event);
  //   facebookService.connectFacebook().then(function(response) {
  //     console.log(response.data);
  //   }, function(error) {
  //     console.log('error: ', error);
  //   });
  // };

  //sign out clears the OAuth cache, the user will have to reauthenticate when returning
  $scope.signOut = function() {
    facebookService.clearCache();
    $scope.friends.length = 0;
    $('#getTimelineButton, #signOut').fadeOut(function() {
      $('#connectButton').fadeIn();
    });
  };

  $scope.go = function () {
    $location.path('/new');
  };
});


