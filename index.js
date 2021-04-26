const express = require('express');
const path = require('path');
const moment = require('moment');
const bodyParser = require('body-parser');

const {html} = require('./html.js');

const PORT = process.env.port || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

app.get('/', (req, res) => {
    res.send(html);
});

app.post('/sessions', (req, res) => {
    console.log(req.body);
    array.push(req.body);
    res.redirect('/');
});

const array = [];


//
// const logger = (req, res, next) => {
//     console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
//     next();
// };
//
// app.use(logger);