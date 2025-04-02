const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
  if (isValid(username)) {
    return res.status(404).json({message: "User already exists!"});
  }
  users.push({"username": username, "password": password});
  return res.status(200).json({message: "User successfully registered. Now you can login"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let get_books = new Promise((resolve, reject) => {
    resolve(JSON.stringify(books,null,4));
  });
  get_books.then((data) => {
    res.send(data);
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let get_book_by_isbn = new Promise ((resolve, reject) => {
    const isbn = req.params.isbn;
    resolve(books[isbn]);
  });
  get_book_by_isbn.then((data) => {
    res.send(data);
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let get_book_by_author = new Promise ((resolve, reject) => {
    const author = req.params.author;
    resolve(Object.values(books).filter((book) => book.author == author));
  });
  get_book_by_author.then((data) => {
    res.send(data);
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let get_book_by_title = new Promise ((resolve, reject) => {
    const title = req.params.title;
    resolve(Object.values(books).filter((book) => book.title == title));
  });
  get_book_by_title.then((data) => {
    res.send(data);
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn].reviews, null, 4));
});

module.exports.general = public_users;
