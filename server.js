/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const registerRoute = require('./routes/registerAuth');
const loginRoute = require('./routes/loginAuth');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// CREATE TABLE users (
//   id UUID,
//   user_name VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
//   password VARCHAR(2048) NOT NULL,
//   first_name VARCHAR(50) NOT NULL,
//   last_name VARCHAR(50) NOT NULL,
//   email varchar(100) NOT NULL UNIQUE
//   );

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// api routes
app.use('/api/user', registerRoute);
app.use('/api/user', loginRoute);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
