const express = require('express');
const morgan = require('morgan');

const estadoRouter = require('../estado/estado.router');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1', estadoRouter);

module.exports = app;