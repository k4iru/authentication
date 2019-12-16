/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const authRoute = require('./routes/auth');
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

app.use('/api/user', authRoute);
app.use('/', express.static(path.join(__dirname, '/public')));


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
