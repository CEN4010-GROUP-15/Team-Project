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

module.exports = router;