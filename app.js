const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const hbs = require('hbs');
const hbsHelpers = require('./server/views/helpers');
const csrfProtection = require('./server/middleware/csrf');
const clientContext = require('./server/middleware/client-context');
const { sessionMiddleware } = require('./server/middleware/session');
const { userStatusLocals } = require('./server/middleware/auth');

const indexRouter = require('./server/routes/routes');

const app = express();
app.initPromise = (async () => {
  app.set('query parser', 'extended');

  // view engine setup
  app.set('views', path.join(__dirname, 'server', 'views'));
  app.set('view engine', 'hbs');
  hbs.localsAsTemplateData(app);
  hbsHelpers(hbs);

  // App-level middleware stack
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(sessionMiddleware());
  app.use(clientContext);
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(userStatusLocals);

  // Static files in public directory
  app.use(express.static(path.join(__dirname, 'client', 'public')));

  // Dev server init
  if (app.get('env') !== 'production') {
    try {
      const { createServer } = require('vite');
      const viteDevServer = await createServer();
      app.use(viteDevServer.middlewares);
    } catch (err) {
      console.error(
        'Unable to initialize dev server! This is usually caused by a config error.'
      );
      console.error(err);
      process.exit(1);
    }
  }

  // Application routes (csrf protection not needed for static resources or vite dev server)
  app.use(csrfProtection);
  app.use('/', indexRouter);

  // catch 404
  app.use(function (req, res) {
    const err = createError(404);
    return res.status(404).render('404', {
      title: '404 - Page Not Found',
      error: req.app.get('env') === 'development' ? err : {},
    });
  });

  // error handler
  app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
})();

module.exports = app;
