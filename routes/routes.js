var express = require('express');
var router = express.Router();

const indexRouter = require('./index');
const usersRouter = require('./users');
const browseRouter = require('./browse');
const dashboardRouter = require('./dashboard');
const loginRouter = require('./login');

router.use('/', indexRouter);
router.use('/about', usersRouter);
router.use('/browse', browseRouter);
router.use('/dashboard', dashboardRouter);
router.use('/login', loginRouter);

module.exports = router