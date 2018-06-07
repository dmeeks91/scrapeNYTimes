const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  byLine:{
    type: String,    
  },  
  link: {
    type: String,
    required: true
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ],
  summary: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
