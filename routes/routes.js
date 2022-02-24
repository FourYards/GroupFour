var express = require('express');
var router = express.Router();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const listingsRouter = require('./routes/listings');
const dashboardRouter = require('./routes/dashboard');
const loginRouter = require('./routes/login');

router.use('/', indexRouter);
router.use('/about', usersRouter);
router.use('/listings', listingsRouter);
router.use('/dashboard', dashboardRouter);
router.use('/login', loginRouter);

module.exports = router