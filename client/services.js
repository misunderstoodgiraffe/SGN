// Include OAuth.js in the <head> of your HTML,

// <script src="/path/to/oauth.js"></script>

// In your JavaScript, add this line to initialize OAuth.js

// OAuth.initialize('your_app_public_key');
angular.module('SGN.login', [])
.factory('facebookService', function($q, $http) {

  //Authentication result returned by facebook. Inclues an auth token
  var authorizationResult = false;
  var authtoken = false;

  return {
    initialize: function() {
      // do we still need this?
    },
    // connectFacebook: function() {
    //   var deferred = $q.defer();
    //   $http.get('http://localhost:3000/signin')
    //   .then(function(response) {
    //     //todo
    //     deferred.resolve(response);
    //   });
    //   return deferred.promise;
    // },
    getFriends: function () {
      // api call to GET /friends
      // return promise
    }
  };
    
});

angular.module('SGN.requests', [])
.factory('SGNRequests', function($http) {
  return {
    initialize: function() {
    },
    getFriends: function () {
      return $http({
        method: 'GET',
        url: '/getFriends', 
        data: entry
      }).then(function(resp) {
        return resp;
      });
    }
  };
    
});