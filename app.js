const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();

const api = require('./app/index.js');
const middlewares = require('./middlewares');

app.use(express.json());


app.get("/", function(req, res) {
    res.send("Project Home");
});

app.use('/api/', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;