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

// serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// api routes
app.use('/api/user', registerRoute);
app.use('/api/user', loginRoute);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
