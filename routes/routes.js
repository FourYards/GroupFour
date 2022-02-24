var express = require('express');
var router = express.Router();

const indexRouter = require('./index');
const usersRouter = require('./users');
const listingsRouter = require('./listings');
const dashboardRouter = require('./dashboard');
const loginRouter = require('./login');

router.use('/', indexRouter);
router.use('/about', usersRouter);
router.use('/listings', listingsRouter);
router.use('/dashboard', dashboardRouter);
router.use('/login', loginRouter);

module.exports = router