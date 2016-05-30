# SGN | Social gaming network

# Tech Stack
- Angular
- Node
- Express
- Passport
- Oauth.io
- MySQL
- Sequelize
- AWS

# NETWORKS/APIs:
- Facebook: https://developers.facebook.com/
- Steam: http://steamcommunity.com/dev

# TEAM MEMBERS
- Product Owner | Josh Wentworth
- Scrum Master | Dylan Tran
- Team Member | Sofia Berlin
- Team Member | Wilson Yu

# STANDARDS
### Client-side Routing:
  - GET: ‘/’ : if logged in -> home, else -> sign in
  - GET: ‘/home’ : friends/newsfeed
  - GET: ‘/signin’ : redirect to FB OAuth
    If user exists -> Home, else -> signup
  - GET: ‘/signup’ : sign-up forms
  - POST: ‘/signup’ : post signup info to server

### Server-side Routing:

#### SGN Profiles
- GET: '/users/friends/' --- getFriends
- POST: '/users/friends/' --- addFriends
- PUT: '/users/friends/' ---- updateProfile
- POST: '/steam/games' --- saves the list of games the user has into db
- GET: '/users/steam' --- gets steam information saved from db
- POST: '/users/streams' --- saves the account information into db

#### STEAM API CALLS:
note: all steam API calls require a query ('?steamID=') or gameID
- GET: '/updateSteam' --- getSteamProfile, retrieves gamer tag/profile picture
- GET: '/updateSteamFriends' --- getSteamFriends, retrives full list of steam friends
- GET: '/getSteamGames' --- getSteamGames, get a list of all steam games a particular steam ID owns
- GET: '/getGameInfo' --- getGameInfo, retrieves information on a particular game using gameID as it's parameter/query

#### OAUTH: 
- GET: ‘/auth/FB’
- GET: ‘/auth/FB/confirm’
- GET: ‘/success’ -> Home
- GET: ‘/fail’ -> Sign In

#### DB STRUCTURE:
See DB schema in db/schema.sql

# GETTING STARTED
    bower install
    npm install
    
- get oauth key 
- get steam API key
- update keys.js
- start your mysql server
    
      mysql.server start

- format DB:

        mysql -u root -p < server/db/schema.sql
# Roadmap Features:
- Blizzard API
- Riot Games API
- IGN news API


  
