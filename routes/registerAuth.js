const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require('../db');
const saltRounds = 10;

router.post('/register', async (req, res) => {
  const exists = await checkIfUserExists(req.body.userName, req.body.email);
  if (!exists) {
    // create new user
    console.log('user does not exist creating new user');
    let userId = await createUser(req.body);
    console.log(`user id ${userId}`);
    res.send(JSON.stringify({
      id: userId,
    }));
  }

  //res.send('Register');
});

async function checkIfUserExists(userName, email) {
  // check if username or email exists in the database already
  const query = 'SELECT 1 FROM users where user_name=$1 OR email=$2 LIMIT 1;';
  const result = await db.query(query, [userName, email]);
  if (result.rowCount > 0) {
    console.log('user exists');
    console.log(result);
    return true;
  }
  console.log('user does not exist');
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

module.exports = router;
