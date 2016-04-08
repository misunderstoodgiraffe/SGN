DROP DATABASE IF EXISTS SGN;

CREATE DATABASE SGN;

USE SGN;

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  FBid INT PRIMARY KEY,
  username VARCHAR(20),
  givenName VARCHAR(30),
  avatar VARCHAR(80),
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
  id INT AUTO_INCREMENT,
  gameID INT PRIMARY KEY,
  name VARCHAR(20),
  image VARCHAR(80)
);

CREATE TABLE usersGames (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  gameID INT,
  FOREIGN KEY (userID) REFERENCES users (FBid),
  FOREIGN KEY (gameID) REFERENCES games (gameID)
);

CREATE TABLE steam (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  Sid INT UNIQUE,
  username VARCHAR(20),
  avatar VARCHAR(80),
  FOREIGN KEY (userID) REFERENCES users (FBid),
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/db/schema.sql
 *  to create the database and the tables.*/