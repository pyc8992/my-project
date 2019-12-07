const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

module.exports = app;