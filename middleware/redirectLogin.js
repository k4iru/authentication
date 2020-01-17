const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('Login');
  } else {
    next();
  }
};

module.exports = redirectLogin;
