const router = require('express').Router();
const db = require('../db');

router.post('/register', (req, res) => {
  res.send('Register');
});

module.exports = router;
