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

  router.get('/import', (req, res, next) => {

    try {
      const Convert = require("../test/books");
      const request = require('request');
      const url = "https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=xcG1qVBzbHK91TJiaiCd86ap2RewcXw6"

      const options = {
        url: url,
        method: 'GET'
      };

      request(options, (err, ress, body) => {
        if (err) {
            return console.log(err);
        }

        const books = Convert.toBooks(body);
        const books2 = books.results;

        console.log(books2)

        // books2.forEach(element => {
        //   let query = `INSERT INTO heroku_30466051e354b84.book (ISBN, name, description, price, author, genre, publisher, year_published, copies_sold, cover_url) VALUES ('${element.primary_isbn13}', '${element.title}', '${element.description}', '20', '${element.author}', 'Non-Fiction', '${element.publisher}', '2020', '100', 'image');`
        //   mysql.query(query, (error, results) => {
            
        //   });
        // });   
      });
      res.json({'ready': 'ready'});
    } catch (error) {
      next(error);
    }
  });

module.exports = router;