const supertest = require('supertest');
const createServer = require('./testserver');

const app = createServer();

// See that we are getting an index page
test('GET /', async () => {
  await supertest(app)
    .get('/')
    .expect(200)
    .then((response) => {
      console.log('We recieved a response, ' + response);
    });
});
