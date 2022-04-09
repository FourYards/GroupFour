const supertest = require('supertest');
const createServer = require('../testserver');

const app = createServer();

describe('GET index page', () => {
  it('responds with a redirect to another page', async () => {
    await supertest(app).get('/').expect(302);
  });
});

describe('GET my jobs page', () => {
  it('responds with a rendered webpage', async () => {
    await supertest(app).get('/myjobs').expect(200);
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
