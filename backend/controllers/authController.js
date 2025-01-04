const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = "your_secret_key";

const register = (req, res) => {
    const { username, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Hashing error." });

        User.create(username, hashedPassword, role, (err, result) => {
            if (err) return res.status(500).json({ message: "Database error.", err });
            res.status(201).json({ message: "User registered successfully." });
        });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err) return res.status(500).json({ message: "Database error.", err });

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Hashing error." });

            if (isMatch) {
                const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
                res.status(200).json({ message: "Login successful.", token });
            } else {
                res.status(401).json({ message: "Invalid username or password." });
            }
        });
    });
};

module.exports = { register, login };
