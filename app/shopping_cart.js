const e = require('express');
const express = require('express');
const mysql = require('../db-connection');

const router = express.Router();

//Retrieve all shopping carts
router.get('/', (req, res, next) => {
    try {
      mysql.query('SELECT * FROM shopping_cart', (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });
//Testing
  /*
router.get('/', (req, res, next) => {
    try {
      mysql.query('SELECT * FROM shopping_cart', (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });
*/

//Create a shopping cart for a user
router.post('/create', (req, res, next) => {
    const user = req.body.user;
    try {
      mysql.query(`SELECT * from user WHERE user_id = ${user}`, (error, results) => {
        if (results.length < 1){
          res.json(`The user with id ${user} does not exist`);
           
        }
        else{
          
          try {
            mysql.query(`SELECT * from shopping_cart WHERE user_id = ${user}`, (error, results2) => {
              console.log(results2)
              if (results2.length > 0){
                res.json(`The user with id ${user} already has a shopping cart`);
                
              }
              else{
                try {
                  mysql.query(`INSERT INTO \`heroku_30466051e354b84\`.\`shopping_cart\` (\`user_id\`, \`books\`) VALUES ('${user}', '');`, (error, results3) => {
                    results3.status = `Success! A shopping cart was added for user with id ${user}.`; 
                    res.json(results3);
                  });
              
                } catch (error) {
                  next(error);
                }
              }
            });
        
          } catch (error) {
            next(error);
          }
        } 
      });
    } catch (error) {
      next(error);
    }
    
   
  });

  //Testing functionality
  /*
router.post('/create', (req, res, next) => {
    const user = req.body.user;

    try {
      mysql.query(`INSERT INTO \`heroku_30466051e354b84\`.\`shopping_cart\` (\`user_id\`, \`books\`) VALUES ('${user}', '');`, (error, results) => {
        res.json(results);
      });
  
    } catch (error) {
      next(error);
    }
  });
*/

//Retrieve the list of books in shopping cart
router.get('/books', (req, res, next) => {
    const user = req.body.user;
    
    try {
      mysql.query(`SELECT books FROM shopping_cart where user_id = ${user}`, (error, results) => {
        console.log(results)
        if (results.length < 1) {
          res.json("This user does not have a shopping cart")
        }
        else if (results[0].books ==""){
          res.json("This shopping cart has no books")
        }
        else{
          let books = results[0].books;
          try {
              mysql.query(`SELECT * FROM book WHERE book_id IN (${books})`, (error2, results2) => {
                  
                res.json(results2);
              });
            } catch (error2) {
              next(error2);
            }
        }
        
      });
    } catch (error) {
      next(error);
    } 
  });
 //Test functinallity 
  /*
router.get('/books', (req, res, next) => {
    const user = req.body.user;
    
    try {
      mysql.query(`SELECT books FROM shopping_cart where user_id = ${user}`, (error, results) => {
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
*/

//Add book to shopping cart
router.put('/addbook', (req, res, next) => {
    const user = req.body.user;
    const bookid = req.body.bookid;
    try {
      mysql.query(`SELECT * FROM user WHERE user_id =${user}`, (error2, results2) => {
         if (results2.length < 1){
           res.json("This user does not exist")
         }
         else{
          try {
            mysql.query(`SELECT * FROM shopping_cart WHERE user_id = ${user}`, (error2, results3) => {
             if (results3.length < 1){
               res.json("This user does not have a shopping cart")
             
             }  
             else{
              try {
                mysql.query(`SELECT * FROM book WHERE book_id = ${bookid}`, (error2, results4) => {                  
                if (results4.length < 1){
                  res.json("This book does not exist")
                
                }
                else{
                  try {
                    mysql.query(`SELECT books FROM shopping_cart where user_id = ${user}`, (error, results) => {
                      let books = results[0].books;
                      try {
                        if(books == ''){
                            books += `${bookid}`
                        }else{
                            books += `,${bookid}`
                        }
                          mysql.query(`UPDATE shopping_cart SET books = '${books}' WHERE  user_id = '${user}';`, (error2, results) => {
                              results.status = `Success! The book was added to the shopping cart.`;
                            res.json(results);
                          });
                        } catch (error2) {
                          next(error2);
                        }
                    });
                  } catch (error) {
                    next(error);
                  } 
                }
                });
              } catch (error2) {
                next(error2);
              }
             } 
              
            });
          } catch (error2) {
            next(error2);
          }
         }
      });
    } catch (error2) {
      next(error2);
    }

    });



//Delete book from shopping cart
router.patch('/removebook', (req, res, next) => {
    const user = req.body.user;
    const bookid = req.body.bookid;

    try {
      mysql.query(`SELECT * FROM user WHERE user_id =${user}`, (error2, results2) => {
         if (results2.length < 1){
           res.json("This user does not exist")
         }
         else{
          try {
            mysql.query(`SELECT * FROM shopping_cart WHERE user_id = ${user}`, (error2, results3) => {
             if (results3.length < 1){
               res.json("This user does not have a shopping cart")
             
             }  
             else{
              try {
                mysql.query(`SELECT * FROM book WHERE book_id = ${bookid}`, (error2, results4) => {                  
                if (results4.length < 1){
                  res.json("This book does not exist")
                
                }
                else{
                  try {
                    mysql.query(`SELECT books FROM shopping_cart where user_id = ${user}`, (error, results) => {
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
                          mysql.query(`UPDATE shopping_cart SET books = '${newBooks}' WHERE  user_id = '${user}';`, (error2, results5) => {
                              results5.status = `Success! Book was removed from shopping cart.`;
                            res.json(results5);
                          });
                        } catch (error2) {
                          next(error2);
                        }
                    });
                  } catch (error) {
                    next(error);
                  } 
                }
                });
              } catch (error2) {
                next(error2);
              }
             } 
              
            });
          } catch (error2) {
            next(error2);
          }
         }
      });
    } catch (error2) {
      next(error2);
    }
  
    });


module.exports = router;