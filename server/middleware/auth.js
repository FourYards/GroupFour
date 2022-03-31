/** @type {[import('express').RequestHandler]} */
exports.userStatusLocals = function (req, res, next) {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.isUnauthenticated = req.isUnauthenticated();
  next();
};
