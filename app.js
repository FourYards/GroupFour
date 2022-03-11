const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const hbsHelpers = require('./server/views/helpers');
const { createServer } = require('vite');

const indexRouter = require('./server/routes/routes');

const app = express();
app.initPromise = (async () => {
  // view engine setup
  app.set('views', path.join(__dirname, 'server', 'views'));
  app.set('view engine', 'hbs');
  hbs.localsAsTemplateData(app);
  hbsHelpers(hbs);

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'client', 'public')));

  app.use('/', indexRouter);

  // Dev server init
  if (app.get('env') !== 'production') {
    try {
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

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
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
