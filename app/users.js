const express = require('express');
const mysql = require('../db-connection');

const router = express.Router();
router.get('/:username', (req, res, next) => {
  const username = req.params.username;
  try {
    mysql.query(`SELECT * FROM user WHERE email = '${username}'`, (error, results) => {
      res.json(results);
    });
  } catch (error) {
    next(error);
  }
});
router.get('/', (req, res, next) => {
    try {
      mysql.query('SELECT * FROM user', (error, results) => {
        res.json(results);
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/create', (req, res, next) => {
    const email = req.body.email
    const pass = req.body.pass
    const name = req.body.name
    const address = req.body.address

    try {
      mysql.query(`INSERT INTO \`heroku_30466051e354b84\`.\`user\` (\`email\`, \`password\`, \`name\`, \`home_address\`) VALUES ('${email}', '${pass}', '${name}', '${address}');`, (error, results) => {
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
