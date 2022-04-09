/** @type {[import('express').RequestHandler]} */
exports.userStatusLocals = function (req, res, next) {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.isUnauthenticated = req.isUnauthenticated();
  next();
};

// TODO: Refactor out the middleware for login checks and call the middleware from others as needed

/** @type {import('express').RequestHandler} */
exports.adminPage = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }

  if (req.user.role !== 'ADM') {
    // Respond with a 403 access denied page
  } else {
    next();
  }
};

exports.adminApi = function (req, res, next) {};
