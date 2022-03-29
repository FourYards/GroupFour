const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('../db/models');

const store = new SequelizeStore({
  db: db.sequelize,
});

exports.sequelizeStore = store;

exports.sessionMiddleware = function (app) {
  return session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: app.get('env') === 'development' ? 4320 : null,
    },
    store,
  });
};
