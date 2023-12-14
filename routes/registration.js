// registration.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pgPool = require("../connection");

// Helper function to hash passwords
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // Checking if user exists
        const userExistsQuery = "SELECT * FROM users WHERE username = $1";
        const userExistsResult = await pgPool.query(userExistsQuery, [username]);

        if (userExistsResult.rows.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await hashPassword(password);

        // Added new user
        const addUserQuery = "INSERT INTO users(username, password) VALUES ($1, $2) RETURNING *";
        const addUserResult = await pgPool.query(addUserQuery, [username, hashedPassword]);
        const newUser = addUserResult.rows[0];

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
