CREATE DATABASE travelRecomendationDB;

USE travelRecomendationDB;

CREATE TABLE users(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(25) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL
);

CREATE TABLE recomendation(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(60) NOT NULL,
  category VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  header VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  photo VARCHAR(255),
  user_id INT(11),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE vote_recomendation(
  id INT PRIMARY KEY AUTO_INCREMENT,
  recomendation_id INT NOT NULL,
  FOREIGN KEY (recomendation_id) REFERENCES recomendation(id),
  userid INT NOT NULL,
  FOREIGN KEY (userid) REFERENCES users(id)
);