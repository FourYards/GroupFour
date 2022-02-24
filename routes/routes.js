var express = require('express');
var router = express.Router();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const listingsRouter = require('./routes/listings');

router.use('/', indexRouter);
router.use('/about', usersRouter);
router.use('/listings', listingsRouter);

module.exports = router