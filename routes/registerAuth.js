const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../db');

const saltRounds = 10;

async function checkIfUserNameExists(userName) {
  // check if username or email exists in the database already
  const query = 'SELECT 1 FROM users WHERE user_name=$1 LIMIT 1;';
  const result = await db.query(query, [userName]);
  if (result.rowCount > 0) {
    return true;
  }
  return false;
}

async function checkIfEmailExists(email) {
  // check if username or email exists in the database already
  const query = 'SELECT 1 FROM users WHERE email=$1 LIMIT 1;';
  const result = await db.query(query, [email]);
  if (result.rowCount > 0) {
    return true;
  }
  return false;
}

async function createUser(user) {
  // generate uuid for unique user id
  const insertQuery = 'INSERT INTO users(id, user_name, password, first_name, last_name, email) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) RETURNING id';

  // gen salt and hash password
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(user.password, salt);
  // insert into db
  const result = await db.query(insertQuery, [user.userName, hash, user.firstName, user.lastName, user.email]);

  // return user id
  console.log(`inside createUser, id is ${result.rows[0].id}`);
  return result.rows[0].id;
}

router.post('/register', async (req, res) => {
  const userName = await checkIfUserNameExists(req.body.userName);
  const email = await checkIfEmailExists(req.body.email);

  if (userName) {
    res.status(500).send(JSON.stringify({
      error: 1,
    }));
    console.log('username exists');
    return;
  }

  if (email) {
    res.status(500).send(JSON.stringify({
      error: 2,
    }));
    console.log('email exists');
    return;
  }

  // create new user
  console.log('user does not exist creating new user');
  const userId = await createUser(req.body);
  console.log(`user id ${userId}`);
  res.send(JSON.stringify({
    id: userId,
  }));
});

module.exports = router;
