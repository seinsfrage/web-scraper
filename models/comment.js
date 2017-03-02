var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  comment: {
    type: String,
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

var Comment = mongoose.model("comment", NoteSchema);

module.exports = Comment;