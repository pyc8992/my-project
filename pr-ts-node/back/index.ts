import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as hpp from 'hpp';
import * as helmet from 'helmet';

import { sequelize } from './models';
import userRouter from './routes/user';
import postRouter from './routes/post';

dotenv.config();
const app = express();
const prod: boolean = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 4000);
sequelize.sync({force: false })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err: Error) => {
    console.error(err);
  });

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan('combined'));
  app.use(cors({
    origin: /nodebird\.com$/,
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}

app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET!,
  cookie: {
    httpOnly: true,
    secure: false, // https -> true
    domain: prod ? '.nodebird.com' : undefined
  },
  name: 'test',
}));
app.use(passport.initialize());
app.use(passport.session());
console.log("1");
app.use('/user', userRouter);
console.log("2");

app.use('/post', postRouter);
console.log("3");

app.get('/', (req, res, next) => {
  res.send('success');
});

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}`);
});