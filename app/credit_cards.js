const express = require('express');
const mysql = require('../db-connection');

const router = express.Router();

router.get('/', (req, res, next) => {

    try {
      mysql.query('SELECT * FROM credit_card', (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });

router.get('/', (req, res, next) => {
    const username = req.query.username;

    try {
      mysql.query(`SELECT DISTINCT credit_card_number
      FROM credit_card
      INNER JOIN user ON credit_card.userId = (SELECT user_id FROM user WHERE email = '${username}'`, (error, results) => {
        console.log(username);
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });

router.post('/create', (req, res, next) => {
    const credit_card_number = req.body.credit_card_number
    const user = req.body.user

    try {
      mysql.query(`INSERT INTO \`heroku_30466051e354b84\`.\`credit_card\` (\`credit_card_number\`, \`userId\`) VALUES ('${credit_card_number}', '${user}');`, (error, results) => {
        res.json(results);
      });
  
    } catch (error) {
      next(error);
    }
  });


module.exports = router;