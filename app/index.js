const express = require('express');

const users = require('./users');
const books = require('./book');
const author = require('./authors');
const credit_card = require('./credit_cards');
const shopping_cart = require('./shopping_cart');
const review = require('./review');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Group 15 - Index'
  });
});

router.use('/users', users);
router.use('/books', books);
router.use('/author', author);
router.use('/shopping-cart', shopping_cart);
router.use('/review', review);
module.exports = router;