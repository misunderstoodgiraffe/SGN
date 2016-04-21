DROP DATABASE IF EXISTS SGN;

CREATE DATABASE SGN;

USE SGN;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fbID VARCHAR(255) NOT NULL UNIQUE,
  steamID VARCHAR(255),
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
  -- FOREIGN KEY (userIdlink1) REFERENCES users(id),
  -- FOREIGN KEY (userIdlink1) REFERENCES users(id)
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gameID VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  image VARCHAR(255)
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gameID INT NOT NULL UNIQUE,
  dateAndTime TIMESTAMP,
  buyIn INT,
  description VARCHAR(1000)
  -- FOREIGN KEY (gameID) REFERENCES games(id)
);


CREATE TABLE usersEvents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  eventId INT
  -- FOREIGN KEY (userID) REFERENCES users(id),
  -- FOREIGN KEY (eventID) REFERENCES events(id)
);

CREATE TABLE gameplays (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gameID INT NOT NULL UNIQUE,
  userID INT NOT NULL UNIQUE,
  dateAndTime TIMESTAMP,
  result BOOLEAN,
  kills INT
  -- FOREIGN KEY (userID) REFERENCES users(id),
  -- FOREIGN KEY (gameID) REFERENCES games(id)
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
  location VARCHAR(255),
  bio VARCHAR(255),
  username VARCHAR(255),
  avatar VARCHAR(255)
  -- FOREIGN KEY (userID) REFERENCES users (id)
);

/*  Execute this file from the command line by typing:
 *    mysqld & --> starts mysql damon (need to kill all other mysql processes)
 *    mysql -u root -p < server/db/schema.sql ----> drops database and starts with clean schema
 *    password: 1234
 *    mysql -u root -p ---> actually starts db
 *  to drop + create the database and the tables.*/