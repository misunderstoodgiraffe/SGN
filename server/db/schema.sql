DROP DATABASE IF EXISTS SGN;

CREATE DATABASE SGN;

USE SGN;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fbID VARCHAR(40) NOT NULL UNIQUE,
  username VARCHAR(20),
  givenName VARCHAR(30),
  avatar VARCHAR(80),
  lastlogin INT
);

CREATE TABLE friends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userIdlink1 INT,
  userIdlink2 INT,
  FOREIGN KEY (userIdlink1) REFERENCES users (id),
  FOREIGN KEY (userIdlink2) REFERENCES users (id)
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gameID VARCHAR(40) NOT NULL UNIQUE,
  name VARCHAR(20),
  image VARCHAR(80)
);

CREATE TABLE usersGames (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  gameID INT,
  FOREIGN KEY (userID) REFERENCES users (id),
  FOREIGN KEY (gameID) REFERENCES games (id)
);

CREATE TABLE steam (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  sID VARCHAR(40) NOT NULL UNIQUE,
  username VARCHAR(20),
  avatar VARCHAR(80),
  FOREIGN KEY (userID) REFERENCES users (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/db/schema.sql
 *    password: 1234
 *  to drop + create the database and the tables.*/