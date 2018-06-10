const axios = require("axios"),
      cheerio = require("cheerio"),
      classes = require("./classes"),
      db = require("../models"),
      Article = classes.Article;

const myFunctions = {
    getCount: type => {
        return new Promise((resolve,reject) => {
            db[type].count({}, (err, newCount) => resolve(newCount));
        })
    },
    getMessage: (type, data) => {
        switch (type)
        {
            case "scrapeComplete":
                
                return { message: (data === 0) ? "No new articles to scrape. Try again later!" :
                        `Successfully scraped ${data} new article${(data > 1) ? "s":" "}!`,
                         type: (data === 0) ? "error" : "success" }
        }
    },
    scrapeArticles: () => {
        return axios.get("https://www.nytimes.com/").then(function(response) {
            let $ = cheerio.load(response.data);
            $("article.story").each(function(i, element) {
                let thisArticle = new Article;
                thisArticle.getDetails($(element));
            });
        });
    },
    updateArticle: (id, save) => {
        return db.Article.updateOne({_id: id},{$set:{saved: save}})
    }
}

module.exports = myFunctions;