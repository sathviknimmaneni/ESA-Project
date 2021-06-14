const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({

  author: { type: [String], required: true},
  title: { type: String, required: true},
  popularity: { type: Number, dufault:0},
  description: { type: String, default:"a interesting book!"},
  branches: { type: [String],dufault:[]},
  genres: { type: [String],dufault:[]},
  courses: { type: [String],dufault:[]},
  profs: { type: [String],dufault:[]},
  status:{type:String,default:"instock"}
});

module.exports = mongoose.model("Books", BooksSchema);
