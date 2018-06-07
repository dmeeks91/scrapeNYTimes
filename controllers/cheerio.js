const Article = require("./classes"),
    axios = require("axios"),
    cheerio = require("cheerio"); 

const methods= {
    scrapeArticles: () => {
        return axios.get("https://www.nytimes.com/").then(function(response) {
            let $ = cheerio.load(response.data);
            $("article.story").each(function(i, element) {
                    let thisArticle = new Article;

                    thisArticle.getDetails($(element));

                    //thisArticle.add2Db("Article");
            });
        });
    }
}

module.exports = methods;