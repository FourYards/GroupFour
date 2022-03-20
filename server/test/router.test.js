const supertest = require('supertest');
const createServer = require('./testserver');

const app = createServer();

describe('Webpages', () => {
  // See that we are getting an index page
  test('GET /', async () => {
    await supertest(app)
      .get('/')
      .expect(200)
      .then((response) => {
        console.log('We recieved a response, ' + response);
      });
  });

  // See that we are getting the browse page
  test('GET /browse', async () => {
    await supertest(app).get('/browse').expect(200);
  });

  // See that we are getting the dashboard page
  test('GET /dashboard', async () => {
    await supertest(app).get('/dashboard').expect(200);
  });

  // See that we are getting the login page
  test('GET /dashboard', async () => {
    await supertest(app).get('/login').expect(200);
  });
});
