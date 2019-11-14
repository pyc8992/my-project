const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const indexRouter = require('./routes');
const webSocket = require('./socket');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', 8000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser('secret'));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: 'secret',
    cookie: {
        httpOnly:true,
        secure:false,
    },
}));
app.use(flash());

app.use('/', indexRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const server = app.listen(app.get('port'), () => {
    console.log('gogo');
});

webSocket(server);