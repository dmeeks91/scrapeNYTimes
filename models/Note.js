const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const NoteSchema = new Schema({
  text: String,
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
