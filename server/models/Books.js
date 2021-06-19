const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({

  author: { type: [String], required: true},
  title: { type: String, required: true},
  popularity: { type: Number, dufault:0},
  description: { type: String, default:"a interesting book!"},
  genres: { type: [String],dufault:[]},
  status:{type:String,default:"book issued"}
});

module.exports = mongoose.model("Books", BooksSchema);
