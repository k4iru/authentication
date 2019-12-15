/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const authRoute = require('./routes/auth');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/', express.static(path.join(__dirname, '/public')));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
