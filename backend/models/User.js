const db = require("../config/db");

const User = {
    create: (username, password, role, callback) => {
        const query = "INSERT INTO Users (username, password, role) VALUES (?, ?, ?)";
        db.query(query, [username, password, role], callback);
    },

    findByUsername: (username, callback) => {
        const query = "SELECT * FROM Users WHERE username = ?";
        db.query(query, [username], callback);
    },
};

module.exports = User;
