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
module.exports = router;