angular.module('SGN.landing', [])
.controller('LandingController', function (facebookService, $scope, $location, $http) {
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

  //for now, is used to get profile pic and username from database.
  $scope.getUserInfo = function () {
    $http({
      method: 'GET',
      url: '/users/profile'
    }).then(function mySucces(response) {
      $scope.username = response.data.username;
      $scope.givenName = response.data.givenName;
      $scope.avatar = response.data.avatar;
      $scope.email = response.data.email;
      $scope.fbID = response.data.fbID;
    }, function myError(response) {
      console.log(response);
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
  $scope.getUserInfo();
});


