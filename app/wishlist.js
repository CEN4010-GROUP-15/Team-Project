const express = require('express');
const mysql = require('../db-connection');

const router = express.Router();

//Retrieve all wishlists 
router.get('/', (req, res, next) => {
    try {
      mysql.query('SELECT * FROM wishlist', (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });

  //Create a new wishlist
router.post('/create', (req, res, next) => {
    const userid = req.body.userid;
    const name = req.body.name;

    try {
      mysql.query(`INSERT INTO wishlist (\`user_id\`, \`books\`, \`name\`) VALUES ('${userid}', '', '${name}');`, (error, results) => {
        res.json(results);
      });
  
    } catch (error) {
      next(error);
    }
  });

  //Add a book to the wishlist
  router.put('/addbook', (req, res, next) => {
    const userid = req.body.userid;
    const bookid = req.body.bookid;
    const name = req.body.name;
    try {
        mysql.query(`SELECT books FROM wishlist where user_id = ${userid} AND name = '${name}'`, (error, results) => {
          let books = results[0].books;
          try {
            if(books == ''){
                books += `${bookid}`
            }else{
                books += `,${bookid}`
            }
              mysql.query(`UPDATE wishlist SET books = '${books}' WHERE  user_id = ${userid} AND name = '${name}';`, (error2, results) => {
                res.json(results);
              });
            } catch (error2) {
              next(error2);
            }
        });
      } catch (error) {
        next(error);
      } 
    });

    //Retrieve list of books in wishlist
    router.get('/books', (req, res, next) => {
        const userid = req.body.userid;
        const name = req.body.name;
        
        try {
          mysql.query(`SELECT books FROM wishlist where user_id = ${userid} AND name = '${name}'`, (error, results) => {
            let books = results[0].books;
            try {
                mysql.query(`SELECT * FROM book WHERE book_id IN (${books})`, (error2, results2) => {
                    console.log(results2);
                  res.json(results2);
                });
              } catch (error2) {
                next(error2);
              }
          });
        } catch (error) {
          next(error);
        } 
      });

    //Remove book from wishlist and into shopping cart
    router.patch('/addtoshop', (req, res, next) => {
        const userid = req.body.userid;
        const bookid = req.body.bookid;
        const name = req.body.name;
        try {
            mysql.query(`SELECT books FROM wishlist where user_id = ${userid} AND name = '${name}'`, (error, results) => {
              let books = results[0].books.split(',');
              
              try {
                let newBooks = '';
                for(let i = 0; i < books.length; i++){
                    if(books[i] != bookid){
                        if(newBooks == ''){
                            newBooks += `${books[i]}`
                        }else{
                            newBooks += `,${books[i]}`
                        }
                    }
                }
                console.log(newBooks);
                  mysql.query(`UPDATE wishlist SET books = '${newBooks}' WHERE  user_id = ${userid} AND name = '${name}';`, (error2, results) => {

                    try {
                        mysql.query(`SELECT books FROM shopping_cart where user_id = ${userid}`, (error, results) => {
                          let books = results[0].books;
                          try {
                            if(books == ''){
                                books += `${bookid}`
                            }else{
                                books += `,${bookid}`
                            }
                              mysql.query(`UPDATE shopping_cart SET books = '${books}' WHERE  user_id = '${userid}';`, (error2, results) => {
                                res.json(results);
                              });
                            } catch (error2) {
                              next(error2);
                            }
                        });
                      } catch (error) {
                        next(error);
                      } 

                  });
                } catch (error2) {
                  next(error2);
                }
                
            });
          } catch (error) {
            next(error);
          } 
        });
    
module.exports = router;