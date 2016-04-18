angular.module('SGN.profile', ['SGN.requests'])
.controller('ProfileController', function ($scope, $location, SGNRequests) {
  $scope.friends = {};
  $scope.getUserProfile = function () {
    //accepts a callback
    SGNRequests.getUserProfile(function(res) {
      $scope.id       = res.body.id;
      $scope.username = res.body.username;
      $scope.location = res.body.location;
      $scope.bio      = res.body.bio;
      $scope.friends  = res.body.friends;
      $scope.games    = res.body.games;
    });
    //returns username
    //user profile pic
    //location
    //bio
    //list of friends
    //list of games they own.
  };
  $scope.getUserFriends = function () {
    console.log('calling getUserFriends');
    SGNRequests.getFriends(function (res) {
      $scope.friends = res.data;
      console.log(res.data);
    });
  };
  $scope.getUserGames = function () {
    console.log('getting Users games');
    SGNRequests.getUserGameRelation($scope.id, function (res){
      $scope.userGames = res.data;
      console.log($scope.userGames);
    });
  };
  $scope.getUserGames();
  $scope.getUserFriends();
});