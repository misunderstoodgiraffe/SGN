# SGN
Social gaming network

# STACK
Angular
Node
  -express
  -passport
  -oauth.io
mySQL
  -sequelize
AWS

# NETWORKS/APIs:
Facebook: https://developers.facebook.com/
Steam: http://steamcommunity.com/dev

# STANDARDS
REQUESTS:
  GET: ‘/’ : if logged in -> home, else -> sign in
  GET: ‘/home’ : friends/newsfeed
  GET: ‘/signin’ : redirect to FB OAuth
		If user exists -> Home, else -> signup
  GET: ‘/signup’ : sign-up forms
  POST: ‘/signup’ : post signup info to server

# REQUESTS:
DB CALLS:
-Profiles
GET: '/users/friends/' --- getFriends
POST: '/users/friends/' --- addFriends
PUT: '/users/friends/' ---- updateProfile
-Steam related
POST: '/steam/games' --- saves the list of games the user has into db
GET: '/users/steam' --- gets steam information saved from db
POST: '/users/streams' --- saves the account information into db

STEAM API CALLS:
note: all steam API calls require a query ('?steamID=') or gameID
GET: '/updateSteam' --- getSteamProfile, retrieves gamer tag/profile picture
GET: '/updateSteamFriends' --- getSteamFriends, retrives full list of steam friends
GET: '/getSteamGames' --- getSteamGames, get a list of all steam games a particular steam ID owns
GET: '/getGameInfo' --- getGameInfo, retrieves information on a particular game using gameID as it's parameter/query

OAUTH: 
GET: ‘/auth/FB’
GET: ‘/auth/FB/confirm’
GET: ‘/success’ -> Home
GET: ‘/fail’ -> Sign In

# DB STRUCTURE:
-relational: mysql?
Users
  -FB profile info
  -Steam profile info
  -Friends
  -Last login

#FILE SYSTEM:
-client
  -aboutus
  -dashboard
  -frontpage
  -profile/updateprofile page
  app.js/index.html
  services
-server
  -apis
    -steam
    -fb
  -config
  -db
  -request handlers
server.js
README


# UI FLOW:
User sign-up:
-Sign in w/ FB
-Update User Profile
-Pressing Fetch Profile after inputting steam ID 64
-Navigates to Home.
-Shows online/offline friends

User Update:
-clicking on fb picture on top left corner brings to profile page
-"edit" edits your profile.

Nav: Find Friends | Gaming News
Home: Friends Activity (based on last login) -> Profiles

User login:
User Login button -> Sign in w/ FB -> Navigate to Home

# Viable Features:
Chatroom
Messaging System
News for most played games
  
