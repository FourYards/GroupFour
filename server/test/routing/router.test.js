const supertest = require('supertest');
const createServer = require('../testserver');

const app = createServer();

describe('GET index page', () => {
  it('responds with a redirect to another page', async () => {
    await supertest(app)
      .get('/')
      .expect(200)
      .then((response) => {
        console.log('We recieved a response, ' + response);
      });
  });
});

describe('GET browse page', () => {
  it('responds with a rendered webpage', async () => {
    await supertest(app).get('/browse').expect(200);
  });
});

describe('GET dashboard page', () => {
  it('responds with a rendered webpage', async () => {
    await supertest(app).get('/dashboard').expect(200);
  });
});

describe('GET login page', () => {
  it('responds with a rendered webpage', async () => {
    await supertest(app).get('/login').expect(200);
  });
});
