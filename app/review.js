const express = require('express');
const mysql = require('../db-connection');

const router = express.Router();

//Create a review
router.post('/create', (req, res, next) => {
    const rating = req.body.rating;
    const bookid = req.body.bookid;
    const userid = req.body.userid;
    const comment = req.body.comment;

    try {
      mysql.query(`INSERT INTO review (\`user_id\`, \`book_id\`, \`rating\`,\`comment\`) VALUES ('${userid}', '${bookid}', '${rating}', '${comment}');`, (error, results) => {
        res.json(results);
      });
  
    } catch (error) {
      next(error);
    }
  });

//Retrieve list of ratings
router.get('/', (req, res, next) => {
    try {
      mysql.query('SELECT rating,comment FROM review ORDER BY rating DESC', (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });

// route to get the average comment for games
router.get('/:id', (req, res, next) => {
  try {
    mysql.query(`SELECT book.book_id, book.name, AVG(review.rating) AS review
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
      res.json(chosen);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;