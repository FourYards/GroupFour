const supertest = require('supertest');
const createServer = require('../testserver');

const app = createServer();

describe('GET a listing with id 1', () => {
  it('Responds with a json object containing the listing', async () => {
    await supertest(app)
      .get('/api/listing?id=1')
      .set('Accept', 'application/json')
      .expect(200);
  });
});

describe('GET all listing posted by user with id 1', () => {
  it('Responds with a json object containing the listings', async () => {
    await supertest(app)
      .get('/api/listing?creator_id=1')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBeDefined;
      });
  });
});
