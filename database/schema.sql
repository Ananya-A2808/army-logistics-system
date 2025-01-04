CREATE DATABASE army_logistics;

USE army_logistics;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'Unit Commander', 'Logistic Officer', 'General User') NOT NULL
);

CREATE TABLE personnel (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rank VARCHAR(50) NOT NULL,
  unit VARCHAR(100),
  specialization VARCHAR(100),
  contact VARCHAR(15)
);

CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(100),
  category VARCHAR(50),
  quantity INT,
  maintenance_date DATE
);

CREATE TABLE missions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  status ENUM('planned', 'in-progress', 'completed'),
  report TEXT
);

CREATE TABLE logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  action VARCHAR(255),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
