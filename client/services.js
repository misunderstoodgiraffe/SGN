angular.module('CGN.requests', [])
.factory('CGNRequests', ($http) => {
  return {
    // OUR MAIN DB CALLS.
    getFriends() {
      return $http({
        method: 'GET',
        url: '/api/me/friends',
      }).then((response) => response.data);
    },
    getProfile() {
      return $http({
        method: 'GET',
        url: '/api/me/profile',
      })
      .then((response) => response.data);
    },
    updateProfile(entry) {
      return $http({
        method: 'PUT',
        url: '/api/me/profile',
        data: entry,
      });
    },

    getSteamProfile(steamID, callback) {
      return $http({
        method: 'GET',
        url: '/updateSteam?steamID=' + steamID,
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
        url: '/getSteamGames?steamID=' + steamID,
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
    getDBSteamGame: function () {
      return $http({
        method: 'GET',
        url: `/api/me/games`,
      })
      .then((response) => response.data);
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
