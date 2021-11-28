const express = require('express');
const mysql = require('../db-connection');

const router = express.Router();

//Create a review
router.post('/create', (req, res, next) => {
    const rating = req.body.rating;
    const bookid = req.body.bookid;
    const userid = req.body.userid;
    let comment = req.body.comment;
    if (rating < 1 || rating > 5) {
      res.json("pwease uwu input a rating between 1 - 5");
    }else{
    try {
      mysql.query(`SELECT * from book WHERE book_id = '${bookid}'`, (error, results) => {
        if(results.length < 1){
          res.json(`The book with id ${bookid} does not exist`); 
        }else {
          try {
            mysql.query(`SELECT * from user  WHERE user_id = '${userid}'`, (error, results) => {
              if(results.length < 1){
                res.json(`The user with id ${userid} does not exist`)
              }else{
                if (comment == ""){
                  comment = "This user left no comment uwu"
                }
                try {
                  mysql.query(`INSERT INTO review (\`user_id\`, \`book_id\`, \`rating\`,\`comment\`) VALUES ('${userid}', '${bookid}', '${rating}', '${comment}');`, (error, results) => {
                   results.status = `Success! Your review was posted.`;
                   try {
                    mysql.query(`UPDATE heroku_30466051e354b84.BOOK SET rating = (SELECT avg(rating) FROM review where book_id = ${bookid}) WHERE (book_id = ${bookid})`, (error, average) => {
                     
                     res.json(results)
                    });
                  } catch (error) {
                    next(error);
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
        }
        
      });
  
    } catch (error) {
      next(error);
      }
    }
  });

//Retrieve list of ratings
router.get('/', (req, res, next) => {
    try {
      mysql.query(`SELECT review.rating, review.comment,review.date_stamp, book.name FROM review, book where book.book_id = review.book_id ORDER BY rating DESC`, (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });

// route to get the average comment for games
router.get('/:id', (req, res, next) => {
  try {
    mysql.query(`SELECT book.book_id, book.name, AVG(review.rating) AS average_rating
    FROM book
        LEFT OUTER JOIN review
            ON review.book_id = book.book_id
    GROUP BY book.book_id`, (error, results) => {
      let id = req.params.id
      let chosen = []

      for(var element of results){
        if(element.book_id == id){
          chosen = element;
          break
        }
      }
      if(chosen.length <= 0){
        res.json('This book has no reviews');
      }else{
        if(chosen.average_rating == null){
        chosen.average_rating = "This book has no average rating because no reviews exists uwu." 
        } res.json(chosen);
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;