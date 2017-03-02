var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  imgsrc: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "comment"
  }
});

var Article = mongoose.model("article", ArticleSchema);

module.exports = Article;