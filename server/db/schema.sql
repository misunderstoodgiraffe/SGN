CREATE DATABASE users;

USE users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(20)
);

CREATE TABLE friends (
  userIdlink1 INT,
  userIdlink2 INT,
  FOREIGN KEY (userIdlink1) REFERENCES users (id),
  FOREIGN KEY (userIdlink2) REFERENCES users (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/db/schema.sql
 *  to create the database and the tables.*/