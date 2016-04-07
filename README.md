# SGN
Social gaming network

# STACK (tentative)
Ember
Node
  -express
  -passport
mySQL
  -sequelize
AWS

# NETWORKS/APIs:
Facebook
Steam

# STANDARDS
REQUESTS:
  GET ‘/’ : if logged in -> home, else -> sign in
  GET ‘/home’ : friends/newsfeed
  GET ‘/signin’ : redirect to FB OAuth
		If user exists -> Home, else -> signup
  GET ‘/signup’ : sign-up forms
  POST ‘/signup’ : post signup info to server

OAUTH: 
  GET ‘/auth/FB’
  GET ‘/auth/FB/confirm’
  GET ‘/success’ -> Home
  GET ‘/fail’ -> Sign In

# DB STRUCTURE:
-relational: mysql?
Users
  -FB profile info
  -Steam profile info
  -Friends
  -Last login

#FILE SYSTEM:
-client
-server
README

# ROADMAP:
1. Set up stack, define standards, finalize frameworks by FRIDAY EOD
2. Build out API integration, database, front-end
3. Deploy on AWS, set up next steps for Features
4. Polish, add features.


# MISC IDEAS/BRAINSTORM ETC...


# UI FLOW:
User sign-up:
User Login button -> Sign in w/ FB, set up Sessions -> create Profile -> Navigate to Home 
Nav: Find Friends | Gaming News
Home: Friends Activity (based on last login) -> Profiles

User login:
User Login button -> Sign in w/ FB, set up Sessions -> Navigate to Home

# Viable Features:
Chatroom

