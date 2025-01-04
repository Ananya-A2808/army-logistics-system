CREATE DATABASE ArmyLogistics;

USE ArmyLogistics;

-- Users Table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'UnitCommander', 'LogisticOfficer', 'GeneralUser') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Personnel Table
CREATE TABLE Personnel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rank VARCHAR(50),
    unit VARCHAR(100),
    specialization VARCHAR(100),
    contact VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table
CREATE TABLE Inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    quantity INT NOT NULL,
    maintenance_due DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Missions Table
CREATE TABLE Missions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mission_name VARCHAR(100) NOT NULL,
    status ENUM('Planned', 'In-Progress', 'Completed') DEFAULT 'Planned',
    assigned_personnel TEXT,
    assigned_inventory TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Logistics Table
CREATE TABLE Logistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transport_resource VARCHAR(100),
    fuel_usage DECIMAL(10, 2),
    schedule_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Logs Table
CREATE TABLE Logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action_description TEXT NOT NULL,
    user_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
