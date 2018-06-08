const db = require("../models");

module.exports.Article = class Article {
    constructor (byLine, link, summary, notes, title) {
        this.byLine = byLine || "";
        this.link = link || "";
        this.notes = notes || [];
        this.saved = "unsaved";
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
        const nonBlank = Object.values(this).filter(prop => prop !== "").length,
              reqProperties = Object.keys(this).length;

        if (nonBlank != reqProperties) return;
        db.Article.findOneAndUpdate({link: this.link}, this, { upsert: true })
        //db.Article.create(obj)
        .then(function(result) {
            //result == null if article alreay exists
            //console.log(result);
        })
        .catch(function(err) {
            //console.log(err);
        });
    };

    newMethod() {
        return this;
    }
}

module.exports.Note = class Note{
    constructor () {
        this.body = "";
        this.title = "";
    };
    add2Db () { 

    }
    
}
