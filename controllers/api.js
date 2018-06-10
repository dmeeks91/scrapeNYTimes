const db = require("../models"),
      express = require("express"),
      fn = require("./functions"),
      router = express.Router();

router.get("/", function(req, res) {
      res.redirect("/articles");
});

//get all unsaved articles
router.get("/articles", function(req, res) {
      db.Article.find({saved:false})
      .then(articles =>{
            res.render("index", {data: articles});
      });
});

//get all saved articles
router.get("/saved", function(req, res) {
      db.Article.find({saved:true})
      .then(articles =>{
            res.render("saved", {data: articles});
      });
});

//get all notes for given article
router.get("/api/article/notes/:id", function(req, res){
      db.Article.findOne({_id:req.params.id})
      .populate("notes")
      .then(article => {
            res.json(article)
      })
      .catch(err => res.json(err));
});

//post new note to given article
router.post("/api/article/note", function(req, res){
      db.Note.create({text: req.body.noteText})
        .then(note => {
            return db.Article
            .findOneAndUpdate({_id: req.body.articleID}, 
            {$push:{ notes: note._id }},{ new: true });
        })
        .then(article => res.json(dbLibrary))
        .catch(err => res.json(err));
});

//Delete specified note
router.delete("/api/article/note", function(req, res){
      //need to work on delete function
      /* db.Note.create({text: req.body.noteText})
        .then(note => {
            return db.Article
            .findOneAndUpdate({_id: req.body.articleID}, 
            {$push:{ notes: note._id }},{ new: true });
        })
        .then(article => res.json(dbLibrary))
        .catch(err => res.json(err)); */
});

//scrape articles from NYTimes
router.get("/api/scrape", function(req, res) {
      fn.getCount("Article").then(oldCount => {      
            fn.scrapeArticles().then(() => {      
                  fn.getCount("Article").then(newCount => {
                        res.send(fn.getMessage("scrapeComplete", newCount - oldCount));  
                  })   
            }); 
      });
});
   
//Add or Remove Article from Saved list
router.put("/api/article", function(req, res) {
      db.Article.updateOne({_id: req.body.id},{$set:{saved: req.body.save}})
      .then(result => res.json(result));
});



module.exports = router;
