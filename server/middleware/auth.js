const express = require('express');

/** @type {import('express').RequestHandler} */
function userStatusLocals(req, res, next) {
  if (req.user) {
    res.locals.user = Object.assign({}, req.user.dataValues);
    delete res.locals.user.passwordHash;
    delete res.locals.user.emailAddress;
    delete res.locals.user.phoneNumber;
    delete res.locals.user.balance;
  }

  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.isUnauthenticated = req.isUnauthenticated();

  if (req.isAuthenticated()) {
    res.locals.clientContext.user = res.locals.user;
  }

  next();
}

/** @type {import('express').RequestHandler} */
function loginRequiredPage(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect(
      req.query.redirect ? '/login' : `/login?redirect=${req.url}`
    );
  }
  next();
}

/** @type {import('express').RequestHandler} */
function loginRequiredApi(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('Please log in.');
  }
  next();
}

const adminPage = express.Router();
adminPage.use(loginRequiredPage, (req, res, next) => {
  if (req.user.role !== 'ADM') {
    return res.redirect('/403');
  }
  next();
});

const adminApi = express.Router();
adminApi.use(loginRequiredApi, (req, res, next) => {
  if (req.user.role !== 'ADM') {
    return res
      .status(403)
      .send('You do not have permission to access the requested resource.');
  }
  next();
});

module.exports = {
  userStatusLocals,
  loginRequiredPage,
  loginRequiredApi,
  adminPage,
  adminApi,
};
