const csrf = require('csurf');
const Handlebars = require('hbs').handlebars;
const csrfMiddlewares = require('express').Router();

csrfMiddlewares.use(csrf());

csrfMiddlewares.use((req, res, next) => {
  const csrfToken = req.csrfToken();
  res.locals.csrfToken = csrfToken;
  res.locals.csrfField = new Handlebars.SafeString(
    '<input type="hidden" name="_csrf" value="' +
      Handlebars.escapeExpression(csrfToken) +
      '">'
  );
  next();
});

module.exports = csrfMiddlewares;
