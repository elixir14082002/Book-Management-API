const mongoose= require("mongoose");

const bookSchema= mongoose.Schema({
      ISBN: String,
      title: String,
      pubDate: String,
      language: String,
      numPage: Number,
      author: Number,
      publications: Number,
      category: [String]
});

//creating book model
const bookModel= mongoose.model("books", bookSchema);
module.exports= bookModel;