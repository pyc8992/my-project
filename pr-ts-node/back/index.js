"use strict";
exports.__esModule = true;
var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
var hpp = require("hpp");
var helmet = require("helmet");
var models_1 = require("./models");
dotenv.config();
var app = express();
var prod = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 4000);
models_1.sequelize.sync({ force: false })
    .then(function () {
    console.log("Database connected");
})["catch"](function (err) {
    console.error(err);
});
if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: /nodebird\.com$/,
        credentials: true
    }));
}
else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true
    }));
}
app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod ? '.nodebird.com' : undefined
    },
    name: 'test'
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function (req, res, next) {
    res.send('success');
});
app.listen(app.get('port'), function () {
    console.log("server is running on " + app.get('port'));
});
