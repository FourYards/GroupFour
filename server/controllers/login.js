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
exports.loginPageController = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  } else {
    return res.render('login', { title: 'Login' });
  }
};

/** @type {[import('express').RequestHandler]} */
exports.loginController = [
  passport.authenticate('local', {
    session: true,
    failWithError: true,
  }),
  function (req, res) {
    return res.redirect(303, req.query.redirect || '/');
  },
  function (err, req, res, next) {
    if (err.name === 'AuthenticationError') {
      return res.redirect(303, 'back');
    } else {
      next(err);
    }
  },
];

/** @type {import('express').RequestHandler} */
exports.logoutController = function (req, res) {
  req.logout();
  res.redirect('/');
};

/** @type {import('express').RequestHandler} */
exports.signupPageController = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  } else {
    return res.render('signUp', { title: 'Sign Up' });
  }
};

/** @type {import('express').RequestHandler} */
exports.signupNewUserController = async function (req, res, next) {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).send('Passwords do not match!');
  }

  try {
    const newUser = await UserAccount.create({
      emailAddress: req.body.username,
      realName: req.body.name,
      phoneNumber: req.body.phone,
      role: 'USR',
      passwordHash: await argon2.hash(req.body.password, {
        type: argon2.argon2id,
        hashLength: 128,
        memoryCost: 15360,
        timeCost: 3,
        parallelism: 1,
      }),
    });

    req.login(newUser, (err) => {
      if (err) next(err);
      else {
        return res.redirect(303, req.query.redirect || '/');
      }
    });
  } catch (err) {
    next(err);
  }
};
