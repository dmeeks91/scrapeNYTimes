const db = require("../models"),
      express = require("express"),
      fn = require("./functions"),
      router = express.Router();

router.get("/", function(req, res) {
      res.redirect("/articles");
});

router.get("/articles", function(req, res) {
      db.Article.find({})
      .then(article => res.render("index", article));
     
});

router.get("/saved", function(req, res) {
      db.Article.find({})
      .then(article => res.render("saved", article));
     
});

router.get("/api/scrape", function(req, res) {
      fn.getCount("Article").then(oldCount => {      
            fn.scrapeArticles().then(() => {      
                  fn.getCount("Article").then(newCount => {
                        res.send(fn.getMessage("scrapeComplete", newCount - oldCount));  
                  })   
            }); 
      });
});
    
module.exports = router;
