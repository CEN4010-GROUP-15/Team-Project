const express = require('express');

const users = require('./users');
const books = require('./book');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Group 15 - Index'
  });
});

router.use('/users', users);
router.use('/books', books);

module.exports = router;