module.exports = function(req, res, next) {
	console.log(req);
  if (!req.session.userJwtToken) {
    res.status(500).send('Your session has expired. Please log in');
  } else {
    return next();
  }
};