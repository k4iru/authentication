/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const registerRoute = require('./routes/registerAuth');
const loginRoute = require('./routes/loginAuth');
const db = require('./db');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
const insertQuery = 'INSERT INTO users(id, user_name, password, first_name, last_name, email) VALUES (gen_random_uuid(),$1, $2, $3, $4, $5)';

// CREATE TABLE users (
//   id UUID,
//   user_name VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
//   password VARCHAR(2048) NOT NULL,
//   first_name VARCHAR(50) NOT NULL,
//   last_name VARCHAR(50) NOT NULL,
//   email varchar(100) NOT NULL UNIQUE
//   );

// db.query(insertQuery, ['g2s', '6666', '999', 'kyle', 'cheung', 'g2s@gmail.com'], (err, res) => {
//   if (err) {
//     console.log('there was an error');
//   } else {
//     const user = res.rows[0];
//     console.log(res.rowCount);
//   }
// });

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// api routes
app.use('/api/user', registerRoute);
app.use('/api/user', loginRoute);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
