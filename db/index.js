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
// generate new uuids with new gen_random_uuid()
//   id UUID,
//   user_name VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
//   password VARCHAR(2048) NOT NULL,
//   salt VARCHAR(1024) NOT NULL,
//   first_name VARCHAR(50) NOT NULL,
//   last_name VARCHAR(50) NOT NULL,
//   email varchar(100) NOT NULL UNIQUE
//   );


