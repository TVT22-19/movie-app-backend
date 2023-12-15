const express = require("express");
const router = express.Router();
const pgPool = require("../connection");
const { getGroup, getAllGroups, addGroup, deleteGroup, addGroupMember, getGroupMembers, deleteGroupMember, userIsMember, userIsOwner, getGroupsByUser } = require('../database_tools/group_db');

//GET LIST OF ALL GROUPS => group id, group name only)
router.get("/allgroups", async (req, res) => {
    try {
        const result = await getAllGroups();
        res.status(200).json(result);
    } catch (error) {
        console.log("Error while interacting with the database:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// RETRIEVE GROUP INFO (for specified group)
// param: group id =>  name, description, avatar_url
router.get("/:groupId", async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const result = await getGroup(groupId);
        if (!result){
            res.status(200).json([]);
        }else{
            res.status(200).json(result);
        }
        
    } catch (error) {
        console.log("Error while interacting with the database:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// RETRIEVE GROUP MEMBERS' BASIC INFO
//group id -> gets user ids, usernames and avatars in an array!
router.get("/members/:groupId", async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const result = await getGroupMembers(groupId);
        if (!result){
            res.status(200).json([]);
        }else{
            const resultArray = Array.isArray(result) ? result : [result]; // ensuring that result is an array
            res.status(200).json(resultArray);
        }
        
    } catch (error) {
        console.log("Error while interacting with the database:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ADD GROUP
// gname, gdesc, gavatar, owner 
// issue: currently a non-existent owner can be added 
router.post('/add', async (req, res) => {
    const client = await pgPool.connect();
    const ownerId = parseInt(req.body.owner);

    try {
        const result = await addGroup(req.body.gname, req.body.gdesc, req.body.gavatar, ownerId);
        res.status(201).json({ message: "Group created successfully", result });

    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release();
    }
});

//DELETE GROUP
//currently no different message if group didn't exist in the first place.
//param: groupId
router.delete('/delete/:groupId', async (req, res) => {
    const client = await pgPool.connect();
    try {
        const result = await deleteGroup(req.params.groupId);
        res.status(202).json({ result, message: 'group deleted' });
    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release();
    }
});


// ADD USER TO GROUP (done after request is accepted)
// groupid, userid
router.post('/addmember', async (req, res) => {
    const client = await pgPool.connect();
    try {
        const result = await addGroupMember(req.body.userid, req.body.groupid);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release();
    }
});


// DELETE USER FROM GROUP (done after request is accepted)
// currently gives no separate error if user-group connection wasn't found 
// groupid, userid
router.delete('/deletemember/:userId/from/:groupId', async (req, res) => {
    const client = await pgPool.connect();
    try {
        const result = await deleteGroupMember(req.params.userId, req.params.groupId);
        res.status(202).json(result);
    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release();
    }
});

// CHECK IF MEMBER
router.get("/is-member/:userID/:groupID", async (req, res) => {
    if(!req.params.userID || !req.params.groupID){
        return res.status(400).json({ error: "User ID and Group ID is required" });
    }

    try{
        const result = await userIsMember(req.params.userID, req.params.groupID);
        res.send(result);
    }catch(error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//CHECK IF OWNER

router.get("/is-owner/:userID/:groupID", async (req, res) => {
    if(!req.params.userID || !req.params.groupID){
        return res.status(400).json({ error: "User ID and Group ID is required" });
    }

    try{
        const result = await userIsOwner(req.params.userID, req.params.groupID);
        res.send(result);
    }catch(error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


// RETRIEVE GROUPS USER IS PART OF
//user id -> 
router.get("/groupsbyuser/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await getGroupsByUser(userId);
        if (!result){
            res.status(200).json([]);
        }else{
            const resultArray = Array.isArray(result) ? result : [result]; // ensuring that result is an array
            res.status(200).json(resultArray);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
