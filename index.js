require("dotenv").config();
const express= require("express"); // requiring the express
const mongoose= require("mongoose");
const database= require("./database"); // requiring the database

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

booky.get("/", (req,res)=> {
  return res.json( {books: database.books} );
});

/*
route: /is
description: get specific books
access: public
parameter: isbn
method: get
*/

booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook= database.books.filter((book) => book.ISBN === req.params.isbn);

  if(getSpecificBook.length === 0)
  {
    return res.json({error: `no book of isbn as ${req.params.isbn}`});
  }

  return res.json({books: getSpecificBook});
});

/*
route: /c
description: get books by category
access: public
parameter: category
method: get
*/

booky.get("/c/:category", (req,res)=> {
  const getSpecificBook = database.books.filter((book) =>
book.category.includes(req.params.category)
);


  if(getSpecificBook.length === 0)
  {
    return res.json({error: `no book of isbn as ${req.params.isbn}`});
  }

  return res.json({books: getSpecificBook});
});

/*
route: /l
description: get books by languages
access: public
parameter: language
method: get
*/

booky.get("/l/:lang", (req, res) => {
 const getSpecificBook= database.books.filter((book) => book.language === req.params.lang);

 if(getSpecificBook.length === 0)
 return res.json( {error: `no book of language ${req.params.lang}`} );

 return res.json( {books: getSpecificBook} );
});

/*
route: /author
description: get all authors
access: public
parameter: none
method: get
*/

booky.get("/author", (req,res) => {
  return res.json({author: database.author});
});

/*
route: /author/book
description: get specific author based on book
access: public
parameter: book
method: get
*/

booky.get("/author/book/:book", (req,res) => {

  const getSpecificAuthor = database.author.filter((author) =>
  author.books.includes(req.params.book)
  );
  
  
    if(getSpecificAuthor.length === 0)
    {
      return res.json({error: `no author of book as ${req.params.book}`});
    }
  
    return res.json({books: getSpecificAuthor});
  
});

/*
route: /author/
description: get specific author based on book
access: public
parameter: book
method: get
*/

booky.get("/author/:id", (req,res) => {

  const getSpecificAuthor = database.author.filter((author) =>
  author.id == req.params.id);

  if(getSpecificAuthor.length === 0)
  return res.json({error: `no author with id ${req.params.id}`});

  return res.json({author: getSpecificAuthor});
  
});

/*
route: /publications/
description: get all publications
access: public
parameter: none
method: get
*/

booky.get("/publications/", (req,res)=>{
  return res.json({publications: database.publication});
});

/*
route: /publications/:id
description: get publication based on id
access: public
parameter: id
method: get
*/

booky.get("/publications/:id", (req,res) => {
  const getAllPub= database.publication.filter((pub) => 
    pub.id == req.params.id
  );

  if(getAllPub.length === 0)
  return res.json({error: `no publication with id as ${req.params.id}`});

  return res.json({publication: getAllPub});
});

/*
route: /publications/books/
description: get publication based on list of books
access: public
parameter: books
method: get
*/

booky.get("/publications/books/:books", (req,res) => {
  const getSpecificPub = database.publication.filter((pub) =>
  pub.books.includes(req.params.books)
  );
  
  
    if(getSpecificPub.length === 0)
    {
      return res.json({error: `no publication of book as ${req.params.books}`});
    }
  
    return res.json({books: getSpecificPub});
});

/*
route: /books/new
description: add new books
access: public
parameter: none
method: post
*/

booky.post("/books/new", (req,res) => {
  const newBook= req.body;
  database.books.push(newBook);
  return res.json({updatedBooks: database.books});
});

/*
route: /authors/new
description: add new authors
access: public
parameter: none
method: post
*/

booky.post("/authors/new", (req,res) => {
  const newAuthor= req.body;
  database.author.push(newAuthor);
  return res.json({updatedAuthor: database.author});
});

/*
route: /publications/new
description: add new authors
access: public
parameter: none
method: post
*/

booky.post("/publications/new", (req,res) => {
  const newpub= req.body;
  database.publication.push(newpub);
  return res.json({updatedPublications: database.publication});
});


booky.listen(3000, ()=> console.log("Server is up and running"));