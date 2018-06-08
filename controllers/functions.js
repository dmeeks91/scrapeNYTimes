const axios = require("axios"),
      cheerio = require("cheerio"),
      classes = require("./classes"),
      db = require("../models"),
      Article = classes.Article,
      Note = classes.Note; 

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
                    return msg = (data === 0) ? "No new articles to scrape. Try again later!" :
                            `Successfully scraped ${data} new article${(data > 1) ? "s":" "}!`;
        }
    },
    scrapeArticles: () => {
        return axios.get("https://www.nytimes.com/").then(function(response) {
            let $ = cheerio.load(response.data);
            $("article.story").each(function(i, element) {
                let thisArticle = new Article;
                thisArticle.getDetails($(element));
                //db.Article.create(thisArticle)
            });
        });
    }
}

module.exports = myFunctions;