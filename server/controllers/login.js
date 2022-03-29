const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../db/models');
const argon2 = require('argon2');

const UserAccount = db.UserAccount;

passport.use(
  new LocalStrategy(function (username, password, done) {
    const authenticate = async () => {
      const user = await UserAccount.findOne({
        where: { emailAddress: username },
      });
      if (!user || !(await argon2.verify(user.passwordHash, password))) {
        return {
          user: false,
          info: { message: 'Username or password was not recognized.' },
        };
      } else {
        return { user };
      }
    };

    authenticate().then(
      ({ user, info }) => done(null, user, info),
      (err) => done(err)
    );
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserAccount.findByPk(id).then(
    (user) => done(null, user),
    (err) => done(err)
  );
});

/** @type {import('express').RequestHandler} */
module.exports.loginPageController = function (req, res, next) {
  return res.render('login', { title: 'Login' });
};

/** @type {[import('express').RequestHandler]} */
module.exports.loginController = [
  passport.authenticate('local', {
    session: true,
    failWithError: true,
  }),
  function (req, res) {
    return res.redirect(303, req.query?.redirect || '/');
  },
  function (err, req, res, next) {
    if (err.name === 'AuthenticationError') {
      res.redirect(303, 'back');
    } else {
      next(err);
    }
  },
];

/** @type {import('express').RequestHandler} */
module.exports.logoutController = function (req, res, next) {
  req.logout();
  res.redirect('/');
};
