const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pgPool = require("../connection");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    try {
        // Search user
        const userQuery = "SELECT * FROM users WHERE username = $1";
        const userResult = await pgPool.query(userQuery, [username]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // creating jwt token with user info
        const token = jwt.sign({ userId: user.id, username: user.username }, "jwt key");

        res.status(200).json({ message: "Login successful", user: user, token: token });
    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
