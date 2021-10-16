const express = require('express');
const mysql = require('../db-connection');

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
      mysql.query('SELECT * FROM book', (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/sort/:genre', (req, res, next) => {
    let genre = req.params.genre
    let year = req.params.year

    console.log(genre);
    try {
      mysql.query('SELECT * FROM book', (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });  

  router.get('/details/:isbn', (req, res, next) => {
    const { isbn } = req.params;

    try {
      mysql.query(`SELECT * FROM book where isbn = ${isbn}`, (error, results) => {
        res.json(results[0] ?? {});
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;