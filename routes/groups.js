///work in progress :)

const express = require("express");
const router = express.Router();
const pgPool = require("../connection");
const {getGroup, addGroup, addGroupPost, deleteGroup, addGroupMember } = require('../database_tools/group_db');

// RETRIEVE GROUP INFO
// param: group id =>  name, description, avatar url

router.get("/:groupId", async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const result = await getGroup(groupId);
        res.status(201).json({result});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// ADD GROUP
// gname, gdesc, gavatar 
router.post('/add', async (req,res) => {
    const client = await pgPool.connect(); 

    try{
        const result = await addGroup(req.body.gname, req.body.gdesc, req.body.gavatar);
        res.status(201).json({ message: "Group created successfully", result });

    } catch (error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release(); 
    }
});

//DELETE GROUP
//currently lacks checking for if the group even exists
//param: groupId
router.delete('/delete/:groupId', async (req,res) => {
    const client = await pgPool.connect(); 
    try{
        const result = await deleteGroup(req.params.groupId);
        res.status(201).json({ result, message: 'group deleted'});
    } catch (error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release(); 
    }
});


// ADD USER TO GROUP (done after request is accepted)
// groupid, userid
router.post('/addmember', async (req,res) => {
    const client = await pgPool.connect(); 
    try{
        const result = await addGroupMember(req.body.userid, req.body.groupid);
        res.status(201).json({ result });
    } catch (error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release(); 
    }
});



//not functional yet
// ADD POST TO GROUP
// groupid, userid, postcontent.. etc
router.post('/post', async (req, res)=>{
    try {
        const result = await addGroupPost(req.body.groupid, req.body.userid, req.body.postcontent);
        if(result){ 
            res.status(200).send('Post added to group ' + groupid);
        }else{
            res.status(404).send('Group ' + req.body.groupid + ' not found');    
        }
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});

module.exports = router;