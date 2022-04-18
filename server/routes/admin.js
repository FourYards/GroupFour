const router = require('express').Router();
const { adminPage } = require('../middleware/auth');

router.get('/', adminPage, (req, res) => {
  return res.render('vueComponent', {
    title: 'Admin Dashboard',
    pageScripts: 'adminDashboard',
  });
});

module.exports = router;
