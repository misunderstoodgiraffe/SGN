import moment from 'moment';

angular.module('SGN.profilePanel', ['SGN.requests'])
.controller('ProfilePanelController', ($scope, $log, CGNRequests) => {
  CGNRequests.getProfile()
    .then((data) => {
      $scope.username = data.username;
      $scope.givenName = data.givenName;
      $scope.avatar = data.avatar;
    });
  CGNRequests.getFriends()
    .then((data) => {
      $scope.friends = data.map((friend) => {
        friend.lastActivity = moment(+friend.lastActivity);
        return friend;
      });
      $log.log(data);
    });
});
