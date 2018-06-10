const express = require("express"),
      exphbs = require("express-handlebars");
      bodyParser = require("body-parser"),
      db = require("./models"),      
      logger = require("morgan"),
      mongoose = require("mongoose"),
      MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines",
      PORT = process.env.PORT || 3000,
      routes = require("./controllers/api");

  let app = express();
      app.engine("handlebars", exphbs({ defaultLayout: "main" }));
      app.set("view engine", "handlebars");
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(express.static("public"));
      app.use(routes);

      mongoose.Promise = Promise;
      mongoose.connect(MONGODB_URI);  
      

      
app.listen(PORT, function() {
console.log("App running on port " + PORT + "!");
});
      