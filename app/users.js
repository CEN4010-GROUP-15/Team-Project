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

router.post('/login', (req, res, next) => {
  const email = req.body.email
  const pass = req.body.pass

  console.log(email, pass);
  try {
    mysql.query(`SELECT user_id, password from user WHERE email = '${email}'`, (error, results) => {
      if(results[0].password === pass){
        res.redirect('/profile');
      }else{
        return res.status(400).send({
          message: 'This is an error!'
       });
      }
    });

  } catch (error) {
    next(error);
  }
});

router.post('/signup', (req, res, next) => {
  const email = req.body.email
  const pass = req.body.pass
  try {
    mysql.query(`SELECT user_id, password from user WHERE email = '${email}'`, (error, results) => {
      if(results[0].password === pass){
        res.json({
          result: true,
          id: results[0].user_id
        })
      }else{
        res.json({
          result: false,
        });
      }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
