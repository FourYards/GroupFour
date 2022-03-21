/** @type {import('express').RequestHandler} */
module.exports = function (req, res, next) {
  switch (req.method) {
    case 'GET':
      return res.render('login', { title: 'Login' });
    case 'POST':
      // Handle login here
      break;
    default:
      return res.status(405).header('Allow', 'GET, POST').send();
  }
};
