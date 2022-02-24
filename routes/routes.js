var express = require('express');
var router = express.Router();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

router.use('/', indexRouter)
router.use('/about', usersRouter)

module.exports = router