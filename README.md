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
mySQL.

Structure is in db/schema.sql

#IMPORTANT THINGS THAT WILL HELP:
----DATABASE----
It won't run without starting mysql server:
'mysql.server start'

run the db:
'mysql -u root -p < server/db/schema.sql'

for testing: 
if you need to reinput data, you can rerun 
'mysql -u root -p < server/db/schema.sql' to automatically drop/reimplement database.

----KEYS----
You're going to need your own keys.js file. Rename it to keys.js and update the information in server/config/keys.js to make runs

----WELCOME----
Our welcome/landing page is a STATIC html page. After people log in using fb oauth, it will redirect to a angular page that looks basically exactly the same. Reason because can't save state on the client side, can only save on the server. By having a different welcome page, we give them 2 routes to go to, either log in or angular site.

Throwing that out there just in case.

tl;dr => welcome/landing page === static, logging into fb => access to angular


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

Dashboard:
-FRIENDS:
  -display your friends that are online/offline
-GAMES:
  -display all the games you own on steam


User Update:
-Clicking on your fb profile picture on the left
-edits your profile.
-fetch profile button: retrieves avatar + gamer tag + list of 10 games
-save game data: saves the game data that you retrieved into the DB
-save: saves the inputted data into db (steamId, email, given name, username)


User login:
User Login button -> Sign in w/ FB -> Navigate to Home

# Viable Features:
Chatroom
Messaging System
News for most played games
  
