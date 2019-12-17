const router = require('express').Router();
const db = require('../db');

router.post('/login', (req, res) => {
  res.send('Login');
});

module.exports = router;
