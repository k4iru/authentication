const router = require('express').Router();
const redirectLogin = require('../middleware/redirectLogin');

router.get('/home', redirectLogin, (req, res) => {
  res.send('Home');
});

module.exports = router;
