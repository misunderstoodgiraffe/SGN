// Create a #connectButton in you landing page that calls connectButton on click
// And a #signOut button that is initially hidden

angular.module('SGN.landing', [])
.controller('LandingController', function (facebookService, $scope, $location) {
  $scope.threads = {};
  $scope.friends = {};
  facebookService.initialize();

  //when the user clicks the connect twitter button, the popup authorization window opens
  $scope.connectButton = function() {
    facebookService.connectFacebook().then(function() {
        //if the authorization is successful, hide the connect button and display the tweets
      $('#connectButton').fadeOut(function() {
        $('#signOut').fadeIn();
      });
  
    });
  };

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


