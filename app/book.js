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

  router.get('/details/:id', (req, res, next) => {
    const { id } = req.params;

    try {
      mysql.query(`SELECT name, description, ISBN FROM book where book_id = ${id}`, (error, results) => {
        res.json(results[0] ?? {});
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;