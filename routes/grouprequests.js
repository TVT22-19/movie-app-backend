
const express = require("express");
const router = express.Router();
const pgPool = require("../connection");
const {addRequest, deleteRequest, getOwnedGroups, getPendingRequests} = require('../database_tools/requests_db');
const {addGroupMember} = require('../database_tools/group_db');

// GET PENDING REQUESTS
router.get("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const ownedGroups = await getOwnedGroups(userId);

        if (!ownedGroups){
            res.status(200).json({ message: 'No owned groups'});
        } else {
            const pendingRequests = [];

            for (const group of ownedGroups) {
                const groupId = group.id;
                const requests = await getPendingRequests(groupId);

                if (requests) {
                    pendingRequests.push({ group_id: groupId, requests });
                }
            }

            res.status(200).json(pendingRequests);
        }
    } catch (error) {
        console.error("Error while processing the request:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// ADD GROUP JOIN REQUEST
// user_id, group_id
router.post('/create', async (req, res) => {
    const client = await pgPool.connect();

    try {
        const result = await addRequest(req.body.userid, req.body.groupid);
        res.status(201).json({ message: "Join request created successfully", result });

    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" }); //returns this also if user/group doesn't exist
    } finally {
        client.release();
    }
});

// REQUEST RESPONSE: ignore or add member, delete request either way
// choice 1 means add member, 0 is ignore and delete 
router.delete('/:userId/fromgroup/:groupId/choice/:choice', async (req, res) => {
    const client = await pgPool.connect();
    try {

        const choice = parseInt(req.params.choice);
        if (choice === 1){
            const addResult = await addGroupMember(req.params.userId, req.params.groupId);
            console.log(addResult);
        }
        const result = await deleteRequest(req.params.userId, req.params.groupId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    } finally {
        client.release();
    }
});

module.exports = router;