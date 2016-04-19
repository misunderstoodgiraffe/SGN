var key = require('./keys.js');

module.exports = function(req, res, next) {
  if (req.path === '/welcome/welcome.html') {
    return next();
  } else if (!req.session.userJwtToken) {
    console.log('no auth token, redirect to welcome');
    res.redirect(key.HOST + '/welcome/welcome.html');
    res.end();
  } else {
    return next();
  }
};


