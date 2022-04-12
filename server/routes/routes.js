const express = require('express');
const router = express.Router();

const indexRouter = require('./index');
const browseRouter = require('./browse');
const myjobsRouter = require('./myjobs');
const dashboardRouter = require('./dashboard');
const loginRouter = require('./login');
const userRouter = require('./user/routes');
const listingRouter = require('./listing/routes');
const reviewRouter = require('./review/routes');
const apiRouter = require('./api/routes');
const accessDeniedPageRouter = require('./403');

const { logoutController } = require('../controllers/login');

router.use('/', indexRouter);
router.use('/login', loginRouter);
router.post('/logout', logoutController);
router.use('/browse', browseRouter);
router.use('/myjobs', myjobsRouter);
router.use('/dashboard', dashboardRouter);
router.use('/user', userRouter);
router.use('/listing', listingRouter);
router.use('/review', reviewRouter);
router.use('/api', apiRouter);
router.use('/403', accessDeniedPageRouter);

module.exports = router;
