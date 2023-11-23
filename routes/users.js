const express = require("express");
const router = express.Router();

const { getUserByUsername, getUsers } = require("../postgre/user");

/* GET users listing. */
router.get("/", async (req, res) => {
    res.send("respond with a resource");
    const users = await getUsers();
    console.log(users);
});

module.exports = router;
