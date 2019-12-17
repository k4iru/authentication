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
const insertQuery = 'INSERT INTO users(user_name, password, email) VALUES ($1, $2, $3)';

// db.query(insertQuery, ['gs', '6666', 'gs@gmail.com'], (err, res) => {
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
