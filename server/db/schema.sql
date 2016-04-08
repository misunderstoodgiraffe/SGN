CREATE DATABASE users;

USE users;

CREATE TABLE user (
  FBid INT PRIMARY KEY,
  username VARCHAR(20),
  givenName VARCHAR(30),
  avatar VARCHAR(80),
  steamID INT,
  lastlogin INT
);

CREATE TABLE friends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userIdlink1 INT,
  userIdlink2 INT,
  FOREIGN KEY (userIdlink1) REFERENCES users (FBid),
  FOREIGN KEY (userIdlink2) REFERENCES users (FBid)
);

CREATE TABLE games (
  gameID INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  image VARCHAR(80)
);

CREATE TABLE usersGames (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  gameID INT,
  FOREIGN KEY (userID) REFERENCES users (FBid),
  FOREIGN KEY (gameID) REFERENCES users (gameID)
);

CREATE TABLE steam (
  Sid INT PRIMARY KEY,
  username VARCHAR(20),
  avatar VARCHAR(80)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/db/schema.sql
 *  to create the database and the tables.*/