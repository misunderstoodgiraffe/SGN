/* 

In the 4 functions getPlayerData, getAllFriends, getRecentGames, getAllGames

All the on 'end' is just console.log atm. if we want to data manipulate in the future, we can change those specific lines.

The format for taking in (in the exports) we will need the steamID passed in AS A STRINGIFIED number.

The data currently displayed through console.log is just stringified data.

*/


var request = require('request');
var key = require('../config/keys.js');

var getPlayerData = function(req, res) {
  var steamID = req.query.steamID;
  var playerData = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + key.STEAM + '&steamids=' + steamID;
  request.get(playerData, function(err, response) {
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(response.body);
    }
  });

};

var getAllFriends = function(req, res) {
  var steamID = req.query.steamID;
  var getAllFriendsLink = 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=' + key.STEAM + '&steamid=' + steamID;
  request.get(getAllFriendsLink, function(err, response) {
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(response.body);
    }
  });
};


var getRecentGames = function (steamID) {
  var steamID = req.query.steamID;
  var recentGamesLink = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + key.STEAM + '&steamid=' + steamID;
  request.get(recentGamesLink, function(err, response) {
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(response.body);
    }
  });
};

var getAllGames = function(req, res) {
  var steamID = req.query.steamID;
  console.log(steamID);
  var allGameData = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + key.STEAM + '&steamid=' + steamID;
  request.get(allGameData, function(err, response) {
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(response.body);
    }
  });
};

var getGameInfo = function(req, res) {
  var gameID = req.query.gameID;
  var gameInfo = 'http://store.steampowered.com/api/appdetails?appids=' + gameID;
  request.get(gameInfo, function(err, response) {
    if(err){
      res.status(500).send(err);
    } else {
      res.status(200).send(response.body);
    }
  });
};

var standardizePlayerData = function (data) {
  var parsedData = JSON.parse(data);
  var dataObj = {};
  dataObj.sID = parsedData.response.players[0].steamid;
  dataObj.username = parsedData.response.players[0].personaname;
  dataObj.avatar = parsedData.response.players[0].avatar;

  return dataObj;
};


module.exports = {
  getPlayerData: getPlayerData,
  getAllFriends: getAllFriends,
  getRecentGames: getRecentGames,
  getAllGames: getAllGames,
  getGameInfo: getGameInfo
};





