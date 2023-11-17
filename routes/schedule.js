const express = require("express");
const router = express.Router();

const xmlParser = require("fast-xml-parser");

/* GET news listing. */
router.get("/", (req, res) => {
    /*
        Params for finnkino scedule XML
        ?area=<ID>          get news from area with an ID
            IDs:
            1018    Oulu
        ?dt=<dd.mm.yyy>     get schedule on this date
        ?eventID=<ID>       get movie with ID
        ?nrOfDays=<n>       get schedule for the next n days
    */
    fetch("https://www.finnkino.fi/xml/Schedule/")
        .then(resp => resp.text())
        .then(data => {
            const parser = new xmlParser.XMLParser();
            const json = parser.parse(data);
            const schedule = json.Schedule.Shows.Show;
            res.send(schedule);
        }).catch(console.error);
});

module.exports = router;
