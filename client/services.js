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
.factory('CGNRequests', ($http) => {
  return {
    // OUR MAIN DB CALLS.
    getFriends() {
      return $http({
        method: 'GET',
        url: '/api/me/friends',
      }).then((response) => response.data);
    },
    addFriend: function (entry) {
      return $http({
        method: 'POST',
        url: '/users/friends',
        data: entry
      }).then(function(resp) {
        return resp;
      });
    },
    getProfile() {
      return $http({
        method: 'GET',
        url: '/api/me/profile',
      })
      .then((response) => response.data);
    },
    updateProfile: function (entry) {
      return $http({
        method: 'PUT',
        url: '/users/profile',
        data: entry
      }).then(function(resp) {
        return resp;
      });
    },

    //STEAM API CALLS
    getSteamProfile: function (steamID, callback) {
      return $http({
        method: 'GET',
        url: '/updateSteam?steamID=' + steamID
      }).then(function(resp) {
        callback (resp);
      });
    },
    getSteamFriends: function(steamID, callback) {
      return $http({
        method: 'GET',
        url: '/updateSteamFriends?steamID=' + steamID
      }).then(function(resp) {
        callback (resp);
      });
    },
    getSteamGames: function(steamID, callback) {
      return $http({
        method: 'GET',
        url: '/getSteamGames?steamID=' + steamID
      }).then(function(resp) {
        callback (resp);
      });
    },
    getGameInfo: function(gameID, callback) {
      $http({
        method: 'GET',
        url: '/getGameInfo?gameID=' + gameID
      }).then(function(resp) {
        callback (resp);
      });
    },

    //OUR DB STEAM GAMES CALLS
    getDBSteamGame: function (gameID) {
      return $http({
        method: 'GET',
        url: '/steam/games?gameID=' + gameID
      }).then(function(resp) {
        callback (resp);
      });
    },
    addDBSteamGame: function (game, callback) {
      return $http({
        method: 'POST',
        url: '/steam/games',
        data: game
      }).then(function(resp) {
        callback (resp);
      });
    },

    //OUR DB USERGAME RELATION CALLS
    addUserGameRelation: function (game, callback) {
      return $http({
        method: 'POST',
        url: '/users/games',
        data: game
      }).then(function(resp) {
        callback (resp);
      });
    },
    getUserGameRelation: function (sgnID, callback) {
      return $http({
        method: 'GET',
        url: '/users/games?sgnID=' + sgnID,
      }).then(function(resp) {
        callback (resp);
      });
    },

    //OUR DB STEAM CALLS
    getSteamDBProfile: function(steamID, callback) {
      return $http({
        method: 'GET',
        url: '/users/steam?steamID=' + steamID,
      }).then(function(resp) {
        callback (resp);
      });
    },
    updateSteamProfile: function (accountInfo) {
     return $http({
       method: 'POST',
       url: '/users/steam',
       data: accountInfo
     }).then(function(resp) {
       return resp;
     });
    },


    getFBFriends: function () {
      return $http({
        method: 'GET',
        url: '/users/addFriends'
      }).then(function(resp) {
        return resp;
      });
    },


  };
});