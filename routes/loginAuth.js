const router = require('express').Router();
const redirectLogin = require('../middleware/redirectLogin');
const db = require('../db');

router.post('/login', (req, res) => {
  res.send('Login');
});

module.exports = router;
