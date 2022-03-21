const supertest = require('supertest');
const createServer = require('../testserver');

const app = createServer();

describe('GET a listing with id 1', () => {
  it('Responds with a json object containing the listing', async () => {
    await supertest(app)
      .get('/api/listing')
      .send({ id: 1 })
      .set('Accept', 'application/json')
      .expect(200);
  });
});
