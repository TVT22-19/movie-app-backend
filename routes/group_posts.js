const express = require("express");
const router = express.Router();

const { getPostsByGroupId, createPost, deletePostByUserId } = require("../database_tools/groupPost");

router.get("/:groupID", async (req, res) => {
    try{
        const groupPosts = await getPostsByGroupId(req.params.groupID);
        res.send(groupPosts);
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    const { title, user_id, group_id, content } = req.body;
    if(!user_id || !group_id){
        return res.status(400).json({ error: "userID and groupID required!" });
    }
    try{
        const dbResponse = await createPost(title, user_id, group_id, content);
        res.status(200).json({ message: "Post created successfully", database: dbResponse });
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:userID", async (req, res) => {
    if(!req.params.userID){
        return res.status(400).json({ error: "userID required!" });
    }
    try{
        const dbResponse = await deletePostByUserId(req.params.userID);
        res.status(200).json({ message: "Post deleted successfully", database: dbResponse });
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;