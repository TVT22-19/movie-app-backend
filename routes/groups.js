const express = require("express");
const router = express.Router();
const pgPool = require("../connection");
const {getGroup, addGroup, addGroupPost } = require('../database_tools/group_db');

// GET by group id (auth?)
// => group id, name, description, avatar url

router.get("/:groupId", async (req, res) => {
    
    try {
        const groupId = req.params.groupId;
        const result = await getGroup(groupId);
        res.status(201).json({result});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'}); //tms.
    }
});

//gname, gdesc, gavatar 
router.post('/add', async (req,res) => {
    const gname = req.body.gname;
    const gdesc = req.body.gdesc;
    const gavatar = req.body.gavatar;

    const client = await pgPool.connect(); 

    try{
        const result = await addGroup(gname, gdesc, gavatar);
        //const newGroup = result.rows[0];
        res.status(201).json({ message: "Group created successfully", result });

    } catch (error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release(); 
    }
});


router.post('/post', async (req, res)=>{
    try {
        const result = await addGroupPost(req.body.groupid, req.body.postcontent);
        if(result){ ///??
            res.status(200).send('Post added to group ' + groupid);
        }else{
            res.status(404).send('Group ' + req.body.groupid + ' not found!');    
        }
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});



module.exports = router;