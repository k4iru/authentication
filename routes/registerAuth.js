const router = require('express').Router();
const db = require('../db');

router.post('/register', async (req, res) => {
  const user = req.body;

  const exists = await checkIfUserExists(user.username, user.email);
  if (!exists) {
    // create new user
    
  }

  res.send('Register');
});

async function checkIfUserExists(username, email) {
  // check if username or email exists in the database already
  const query = 'SELECT 1 FROM users where user_name=$1 OR email=$2 LIMIT 1;';
  const result = await db.query(query, [username, email]);
  if (result.rowCount > 0) {
    return true;
  }
  return false;
}

module.exports = router;
