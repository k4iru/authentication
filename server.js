// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
console.log(path.join(__dirname, '/public'));
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
