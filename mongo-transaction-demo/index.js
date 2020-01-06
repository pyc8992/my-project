const express = require('express');
const dbConn = require('./api/models');
dbConn();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", require("./api/routes/users")); //USER 관련

app.listen(3000, () => {
    console.log(`server is running on 3000`);
});