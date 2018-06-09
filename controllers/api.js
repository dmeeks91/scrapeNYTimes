const db = require("../models"),
      express = require("express"),
      fn = require("./functions"),
      router = express.Router();

router.get("/", function(req, res) {
      res.redirect("/articles");
});

router.get("/articles", function(req, res) {
      db.Article.find({saved:false})
      .then(articles =>{
            res.render("index", {data: articles});
      });
});

router.get("/saved", function(req, res) {
      db.Article.find({saved:true})
      .then(articles =>{
            res.render("saved", {data: articles});
      });
});

router.get("api/saved", function(req, res) {
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
    
router.put("/api/save", function(req, res) {
      db.Article.updateOne({_id: req.body.id},{$set:{saved: true}})
      .then(article => res.json(article));
});

module.exports = router;
