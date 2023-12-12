const express = require("express");
const router = express.Router();

const { getUsers, getUserById, updateUserById } = require("../database_tools/user");

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

    try{
        const dbResponse = await updateUserById(username, password, age, firstname, lastname, avatar_url, id);
        res.send(dbResponse)
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;