var db = require("../models");

module.exports = class Article{
    constructor (byLine, link, summary, notes, title) {
        this.byLine = byLine || "";
        this.link = link || "";
        this.notes = notes || [];
        this.summary = summary || "";
        this.title = title || "";
    }
    getDetails(el){
        this.title = this.scrape(el,"title");
        this.link = this.scrape(el,"link");
        this.byLine = this.scrape(el,"byLine");
        this.summary = this.scrape(el,"summary");
        this.add2Db();
    };
    scrape($,type)
    {
        switch (type)
        {
            case "title":
                return $.children(".story-heading").text().trim();
                break;
            case "link":
                return $.children(".story-heading")
                    .children("a")
                    .attr("href");
                break;
            case "byLine":
                let author =  $.children(".byline").text().trim();
                return (author === "") ? "unknown" : author;
                break;
            case "summary":
                let sum = $.children(".summary").text().replace("\n","").trim();
                if(sum === "")
                {
                    sum = $.children("ul").children("li")
                    .first().text().replace("\n","").trim();
                }
                return sum;
                break;
        }
    };
    add2Db(){ 
        const nonBlank = Object.values(this).filter(prop => prop != "").length,
              reqProperties = Object.keys(this).length - 1;

        if (nonBlank != reqProperties) return;
        db.Article.create(this)
        .then(function(result) {
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            return console.log(err);
        });
    };
}