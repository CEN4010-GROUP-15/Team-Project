const PORT = process.env.PORT || 3000;

const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

const api = require('./app/index.js');
const middlewares = require('./middlewares');

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use('/scripts', express.static('scripts'))
app.use('/scss', express.static('scss'))


app.get('/',function(req,res) {
    res.sendFile(__dirname + '/pages/index.html');
  });
  
app.get('/login',function(req,res) {
    res.sendFile(__dirname + '/pages/login.html');
  });

app.get('/profile',function(req,res) {
  res.sendFile(__dirname + '/pages/profile.html');
});

app.get('/register',function(req,res) {
  res.sendFile(__dirname + '/pages/register.html');
});


app.use('/api/', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;