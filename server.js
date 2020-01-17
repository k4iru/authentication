/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const redis = require('redis');
const path = require('path');
const RedisStore = require('connect-redis')(session);
const registerRoute = require('./routes/registerAuth');
const loginRoute = require('./routes/loginAuth');
const home = require('./routes/home');

let client = redis.createClient();

const TWO_HOURS = 1000 * 60 * 60 * 2;

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/');
  } else {
    next();
  }
};

const {
  PORT = 3000,
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'wadsdwa',
  SESS_LIFETIME = TWO_HOURS,
} = process.env;

const IN_PROD = NODE_ENV === 'production';

const app = express();

app.use(express.json());

app.use(session({
  store: new RedisStore({ client }),
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD,
  },
}));

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/home', home);

// api routes
app.use('/api/user', redirectLogin, registerRoute);
app.use('/api/user', loginRoute);


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
