const express = require('express');

const users = require('./users');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Group 15 - Index'
  });
});

router.use('/users', users);

module.exports = router;