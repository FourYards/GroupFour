const express = require('express');
const apiRouter = require('../routes/api/routes');

function createServer() {
  const app = express();
  app.use(express.json());
  app.use('/', apiRouter);
  return app;
}

module.exports = createServer;
