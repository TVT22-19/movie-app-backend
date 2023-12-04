const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pgPool = require("../connection");

router.delete("/:userId", async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        // Check if user exists
        const userQuery = "SELECT * FROM users WHERE id = $1";
        const userResult = await pgPool.query(userQuery, [userId]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete user
        const deleteUserQuery = "DELETE FROM users WHERE id = $1 RETURNING *";
        const deleteUserResult = await pgPool.query(deleteUserQuery, [userId]);
        const deletedUser = deleteUserResult.rows[0];

        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
