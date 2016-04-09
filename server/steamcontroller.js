/* 

In the 4 functions getPlayerData, getAllFriends, getRecentGames, getAllGames

All the on 'end' is just console.log atm. if we want to data manipulate in the future, we can change those specific lines.

The format for taking in (in the exports) we will need the steamID passed in AS A STRINGIFIED number.

The data currently displayed through console.log is just stringified data.

*/




var request = require('request');
var key = require('./keys.js');

var getPlayerData = function(steamID) {
  var body = '';
  var playerData = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + key.STEAM + '&steamids=' + steamID;
  request.get(playerData)
  .on('data', function(data) {
    body += data;
  })
  .on('end', function (){
    standardizePlayerData(body);
  });
};

var getAllFriends = function(steamID) {
  var body = '';
  var getAllFriendsLink = 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=' + key.STEAM + '&steamid=' + steamID;
  request.get(getAllFriendsLink)
  .on('data', function(data) {
    body+= data;
  })
  .on('end', function() {
    console.log(body);
  });
};


var getRecentGames = function (steamID) {
  var body = '';
  var recentGamesLink = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + key.STEAM + '&steamid=' + steamID;
  request.get(recentGamesLink)
  .on('data', function(data) {
    body += data;
  })
  .on('end', function (){
    console.log(body);
  });
};

var getAllGames = function(steamID) {
  var body = '';
  var allGameData = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + key.STEAM + '&steamid=' + steamID;
  request.get(allGameData)
  .on('data', function(data) {
    body += data;
  })
  .on('end', function (){
    console.log(body);
  });
};

var standardizePlayerData = function (data) {
  var parsedData = JSON.parse(data);
  var dataObj = {};
  dataObj.sID = parsedData.response.players[0].steamid;
  dataObj.username = parsedData.response.players[0].personaname;
  dataObj.avatar = parsedData.response.players[0].avatar;


  console.log(dataObj);
  return dataObj;
};

// module.exports = {
//   getFriendsList: function (req, res) {
//     getFriendsList(steamID)
//   }
// };

// getAllFriends('76561198082162743');

// getRecentGames('76561198045493551');

getPlayerData('76561198045493551');

// getAllGames('76561198045493551');
