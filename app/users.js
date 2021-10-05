const express = require('express');
const mysql = require('../db-connection');

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
      mysql.query('SELECT * FROM user', (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
