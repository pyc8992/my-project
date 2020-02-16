const express = require('express');

const db = require('./models');
const app = express();
db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
app.use('/api/posts', require('./routes/posts'));

app.listen(4000, () => {
  console.log(`server is running on port ${4000}`);
});