const express = require('express');
const mysql = require('../db-connection');

const router = express.Router();

router.get('/', (req, res, next) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;

    console.log(req.query);

    try {
      mysql.query(`SELECT book.name, author.first_name, author.last_name
      FROM book
      INNER JOIN author ON book.author_id = (SELECT author_id FROM author WHERE first_name = '${first_name}' AND last_name = '${last_name}');`, (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;