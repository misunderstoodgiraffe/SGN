[![Build Status](https://travis-ci.org/ImmaculateHangover/CGN.svg?branch=master)](https://travis-ci.org/ImmaculateHangover/CGN)
# Crunchy Gaming Network

Discover and connect with your Facebook friends across multiple gaming platforms.
Read the full synopsis in our [press release](docs/PRESS-RELEASE.md)

##Usage
TBD

## Getting Started (Developer)
### Prerequisites
* Node 5.8
* Git

### Fork & Clone Repo
1. Fork the repo through Github
1. `git clone https://github.com/YOUR_USER_NAME/CGN.git`

### Install Dependencies
From the root directory of the cloned repo in your terminal:
```
npm install -g webpack // sudo may be required for global installs
npm install -g webpack-dev-server
npm install -g json-server
npm install
npm install --only=dev
```
### Start Development Server
Run `npm build` to do an initial compilation and bundling of static assets.

Run `npm start`.

This will start the webpack-dev-server which will serve the bundled angular app as well as static assets. The webpack-dev-server will watch the client side javascript files for changes and hot load them into the page when a change occurs. Any requests to the CGN API will be proxied to a json-server running on a separate port, which will respond with mock data.

To test against live data in the staging or production environment, you can edit the proxy location in webpack.dev.js to point to a different endpoint, such as the production or staging URL.

## STACK
* Front-end
  * Angular 1.5x
  * Webpack + Babel
* Web tier
  * Heroku
  * Node 5.x
  * express
  * passport
  * oauth.io
  * sequelize ORM
* Data tier
  * MySQL
    * ClearDB (Heroku addon)

## 3rd Party APIs
* Facebook: https://developers.facebook.com/
* Steam: http://steamcommunity.com/dev

## API
(Final API TBD)

#### Profiles
GET: '/users/friends/' --- getFriends
POST: '/users/friends/' --- addFriends
PUT: '/users/friends/' ---- updateProfile

#### Steam related
POST: '/steam/games' --- saves the list of games the user has into db
GET: '/users/steam' --- gets steam information saved from db
POST: '/users/streams' --- saves the account information into db

#### STEAM API CALLS:
note: all steam API calls require a query ('?steamID=') or gameID
GET: '/updateSteam' --- getSteamProfile, retrieves gamer tag/profile picture
GET: '/updateSteamFriends' --- getSteamFriends, retrives full list of steam friends
GET: '/getSteamGames' --- getSteamGames, get a list of all steam games a particular steam ID owns
GET: '/getGameInfo' --- getGameInfo, retrieves information on a particular game using gameID as it's parameter/query

#### OAUTH
GET: ‘/auth/FB’
GET: ‘/auth/FB/confirm’
GET: ‘/success’ -> Home
GET: ‘/fail’ -> Sign In


## Project Structure:
TBD

## Feature Roadmap

## Progress
[![Throughput Graph](https://graphs.waffle.io/ImmaculateHangover/CGN/throughput.svg)](https://waffle.io/ImmaculateHangover/CGN/metrics)

## Build History
[![Build Status](https://travis-ci.org/ImmaculateHangover/CGN.svg?branch=master)](https://travis-ci.org/ImmaculateHangover/CGN)

See past builds [here](https://travis-ci.org/ImmaculateHangover/CGN).


## Contributing
1. Make sure you have [eslint](https://github.com/eslint/eslint) setup in your editor of choice.
1. Follow the [Angular Style Guide](https://github.com/johnpapa/angular-styleguide/tree/master/a1).
1. All new contributions should be written in ES6 and follow the [AirBnB Javascript Style Guide](https://github.com/airbnb/javascript). (Following the first step will help you with this).
1. Follow the instructions in our [Contribution Guidelines](docs/CONTRIBUTING.md).


  
