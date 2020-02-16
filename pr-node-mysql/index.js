var express = require('express');
var db = require('./models');
var app = express();
db.sequelize.sync();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
app.use('/api/posts', require('./routes/posts'));
app.listen(4000, function () {
    console.log("server is running on port " + 4000);
});
