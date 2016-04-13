DROP DATABASE IF EXISTS SGN;

CREATE DATABASE SGN;

USE SGN;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fbID VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255),
  givenName VARCHAR(255),
  email VARCHAR(255),
  avatar VARCHAR(255),
  lastlogin INT
);

CREATE TABLE friends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userIdlink1 INT,
  userIdlink2 INT
  -- CONSTRAINT friends_ibfk_1 FOREIGN KEY (userIdlink1) REFERENCES users (id),
  -- CONSTRAINT friends_ibfk_1 FOREIGN KEY (userIdlink2) REFERENCES users (id)
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gameID VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  image VARCHAR(255)
);

CREATE TABLE usersGames (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userID INT,
  gameID INT
  -- FOREIGN KEY (userID) REFERENCES users (id),
  -- FOREIGN KEY (gameID) REFERENCES games (id)
);

CREATE TABLE steam (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userID INT NOT NULL UNIQUE,
  steamID VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255),
  avatar VARCHAR(255)
  -- FOREIGN KEY (userID) REFERENCES users (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/db/schema.sql
 *    password: 1234
 *  to drop + create the database and the tables.*/