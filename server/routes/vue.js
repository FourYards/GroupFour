const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('vueComponent', {
    title: 'Vue + Vite + Express App',
    pageScripts: 'vue',
  });
});

module.exports = router;
