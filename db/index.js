const dotenv = require('dotenv').config();
const { Pool } = require('pg');
console.log(process.env.DB_URL);
const pool = new Pool({
  connectionString: process.env.DB_URL,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};

// CREATE TABLE users (
//   id SERIAL,
//   user_name varchar(50) NOT NULL UNIQUE PRIMARY KEY,
//   password varchar(2048) NOT NULL,
//   email varchar(100) NOT NULL UNIQUE
//   );
