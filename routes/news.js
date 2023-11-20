const express = require("express");
const router = express.Router();

const xmlParser = require("fast-xml-parser");

/* GET news listing. */
router.get("/", (req, res) => {
    /*
        Params for finnkino news XML
        ?area=<ID>          get news from area with an ID
            IDs:
            1018    Oulu
        ?categoryID=<ID>    get news about specific category
            IDs:
            1073    Ajankohtaista
            1079    Leffauutiset
        ?eventID=<ID>       get news about specific event
    */
    fetch("https://www.finnkino.fi/xml/News/")
        .then(resp => resp.text())
        .then(data => {
            const parser = new xmlParser.XMLParser();
            const json = parser.parse(data);
            const newsArticles = json.News.NewsArticle;
            res.send(newsArticles);
        }).catch(console.error);
});

module.exports = router;
