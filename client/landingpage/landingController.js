angular.module('CGN.landing', [])
.controller('LandingController', (facebookService, $scope, $location, $http) => {
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
  $scope.getUserInfo = () => {
    $http({
      method: 'GET',
      url: '/api/me/profile',
    }).then((response) => {
      $scope.id = response.data.id;
      $scope.username = response.data.username;
      $scope.givenName = response.data.givenName;
      $scope.avatar = response.data.avatar;
      $scope.email = response.data.email;
      $scope.fbID = response.data.fbID;
    }, (error) => {
      console.log(error);
    });
  };

  //sign out clears the OAuth cache, the user will have to reauthenticate when returning
  $scope.signOut = function() {
    facebookService.clearCache();
    $scope.friends.length = 0;
    $('#getTimelineButton, #signOut').fadeOut(() => {
      $('#connectButton').fadeIn();
    });
  };
  $scope.getUserInfo();
});


