const express = require("express");
const router = express.Router();

const manifest = require('./../package.json');

/* GET home page. */
router.get("/", (req, res) => {
    res.send({
        name: manifest.name,
        version: manifest.version,
        authors: [
            "Asla",
            "Din",
            "Kit Lehto",
            "Topi"
        ]
    });
});

module.exports = router;
