const dotenv = require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  // using elephantsql
  connectionString: process.env.DB_URL,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
