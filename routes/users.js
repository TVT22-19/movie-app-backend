const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { getUsers, getUserById, updateUserById, deleteUserById } = require("../database_tools/user");

const jwtSecret = process.env.JWT_SECRET || "default-secret-key";

/* GET users listing. */
router.get("/", async (req, res) => {
    try{
        const users = await getUsers();
        res.send(users);
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* Get user by ID */
router.get("/:id", async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ error: "User ID is required" });
    }

    try{
        const user = await getUserById(req.params.id);
        res.send(user);
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/update", async (req, res) => {
    const {username, password, age, firstname, lastname, avatar_url, id} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwt.sign({userId: id, username: username }, jwtSecret);

    try{
        const dbResponse = await updateUserById(username, hashedPassword, age, firstname, lastname, avatar_url, id);
        res.status(200).json({ message: "Update successful", username: username, token: token });
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete("/delete/:id", async (req, res) => {
    try{
        const dbResponse = await deleteUserById(req.params.id);
        res.status(200).json({ message: "User deleted successfully", database: dbResponse })
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;