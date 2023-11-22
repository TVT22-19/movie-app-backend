const express = require("express");
const router = express.Router();

// GET by group id (auth?)
// => group id, name, description, avatar url

router.get("/:groupId", (req, res) => {
    
    try {
        const groupId = req.params.groupId;
         //database fetch 



        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'}); //tms.
    }
});

module.exports = router;