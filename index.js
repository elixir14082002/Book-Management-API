require("dotenv").config();
const express= require("express"); // requiring the express
const mongoose= require("mongoose");
const database= require("./database"); // requiring the database

//model
const bookModel= require("./database/book");
const authorModel= require("./database/author");
const publicationModel= require("./database/publication");

const bodyParser= require("body-parser"); // requiring the body parser

const booky= express();

booky.use(bodyParser.urlencoded({extended: true}));

booky.use(bodyParser.json());

//establish connection

mongoose.connect(
  process.env.MONGO_URL
).then(()=> console.log("Connection is established"));

/*
route: /
description: get all books
access: public
parameter: none
method: get
*/

booky.get("/", async (req,res)=> {
  const getAllBooks= await bookModel.find();
  return res.json(getAllBooks);
});

/*
route: /is
description: get specific books
access: public
parameter: isbn
method: get
*/

booky.get("/is/:isbn", async (req, res) => {
  const getSpecificBook= await bookModel.findOne({ISBN: req.params.isbn});

  if(!getSpecificBook)
    return res.json({error: `no book of isbn as ${req.params.isbn}`});

  return res.json({books: getSpecificBook});
});

/*
route: /c
description: get books by category
access: public
parameter: category
method: get
*/

booky.get("/c/:category", async (req,res)=> {
  const getSpecificBook = await bookModel.findOne({category: req.params.category});


  if(!getSpecificBook)
    return res.json({error: `no book of isbn as ${req.params.isbn}`});

  return res.json(getSpecificBook);
});

/*
route: /l
description: get books by languages
access: public
parameter: language
method: get
*/

booky.get("/l/:lang", async (req, res) => {
 const getSpecificBook= await bookModel.findOne({language: req.params.lang});

 if(!getSpecificBook)
 return res.json( {error: `no book of language ${req.params.lang}`} );

 return res.json(getSpecificBook);
});

/*
route: /author
description: get all authors
access: public
parameter: none
method: get
*/

booky.get("/author", async (req,res) => {
  const getAllAuthors= await authorModel.find();
  return res.json(authorModel);
});

/*
route: /author/book
description: get specific author based on book
access: public
parameter: book
method: get
*/

booky.get("/author/book/:book", async (req,res) => {

  const getSpecificAuthor = await authorModel.findOne({books: req.params.book});
  
  
    if(!getSpecificAuthor)
      return res.json({error: `no author of book as ${req.params.book}`});
  
    return res.json(getSpecificAuthor);
  
});

/*
route: /author/
description: get specific author based on id
access: public
parameter: id
method: get
*/

booky.get("/author/:id", async (req,res) => {

  const getSpecificAuthor = await authorModel.findOne({id: parseInt(req.params.id)});

  if(!getSpecificAuthor)
  return res.json({error: `no author with id ${req.params.id}`});

  return res.json(getSpecificAuthor);
  
});

/*
route: /publications/
description: get all publications
access: public
parameter: none
method: get
*/

booky.get("/publications/", async (req,res)=>{
  const getallPub= await publicationModel.find();
  return res.json(getallPub);
});

/*
route: /publications/:id
description: get publication based on id
access: public
parameter: id
method: get
*/

booky.get("/publications/:id", async (req,res) => {
  const getSpecificPub= await publicationModel.findOne({id: parseInt(req.params.id)});

  if(!getSpecificPub)
  return res.json({error: `no publication with id as ${req.params.id}`});

  return res.json(getSpecificPub);
});

/*
route: /publications/books/
description: get publication based on list of books
access: public
parameter: books
method: get
*/

booky.get("/publications/books/:books", async (req,res) => {
  const getSpecificPub = await publicationModel.findOne({books: req.params.books});
  
  
    if(!getSpecificPub)
      return res.json({error: `no publication of book as ${req.params.books}`});
  
    return res.json(getSpecificPub);
});

/*
route: /books/new
description: add new books
access: public
parameter: none
method: post
*/

booky.post("/books/new", async (req,res) => {
  const {newBook} = req.body;
  const addNewBook= bookModel.create(newBook);
  return res.json({Books: addNewBook, message: "Book was added"});
});

/*
route: /authors/new
description: add new authors
access: public
parameter: none
method: post
*/

booky.post("/authors/new", async (req,res) => {
  const {newAuthor}= req.body;
  const addNewAuthor= authorModel.create(newAuthor);
  return res.json({Author: addNewAuthor, message: "author is added"});
});

/*
route: /publications/new
description: add new publications
access: public
parameter: none
method: post
*/

booky.post("/publications/new", async (req,res) => {
  const {newpub}= req.body;
  const addNewPub= publicationModel.create(newpub);
  return res.json({Publications: addNewPub, message: "Publication is added"});
});


booky.listen(3000, ()=> console.log("Server is up and running"));