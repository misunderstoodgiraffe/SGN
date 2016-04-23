module.exports = function checkAuth(req, res, next) {
  if (!req.session.userJwtToken) {
    res.status(500).send('Your session has expired. Please log in');
  } else {
    next();
  }
};
