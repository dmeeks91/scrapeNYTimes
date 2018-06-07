const axios = require("axios"),
      cheerio = require("cheerio"),
      db = require("../models"),
      express = require("express"),
      myCheerio = require("./cheerio"),
      router = express.Router();

router.get("/scrape", function(req, res) {
// use axios to get nyTimes html
      axios.get("https://www.nytimes.com/").then(function(response) {
            myCheerio.scrapeArticles().then(()=>{
                  res.send("Scrape Complete");
            });
      });
});
    
module.exports = router;
