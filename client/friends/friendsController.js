import moment from 'moment';

angular.module('CGN.friends', ['CGN.requests'])
.controller('FriendsController', ($scope, $log, CGNRequests) => {
  CGNRequests.getFriends()
    .then((data) => {
      $scope.friends = data.map((friend) => {
        friend.lastActivity = moment(+friend.lastActivity);
        return friend;
      });
      $log.log(data);
    });
});
