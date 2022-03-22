const supertest = require('supertest');
const createServer = require('../testserver');

const app = createServer();

describe('GET user balance', () => {
  it('Responds with a json object containing the user balance', async () => {
    await supertest(app)
      .get('/api/balance')
      .expect(200)
      .then((response) => {
        expect(response.body.balance).toBe(100);
      });
  });
});

describe('PUT a user account to have 500 dollars', () => {
  it('responds with an 204', async () => {
    await supertest(app).put('/api/balance').send({ balance: 500 }).expect(204);
  });
});

describe('PUT a user account to have an invalid amount', () => {
  it('responds with an 400 for invalid supplied data', async () => {
    await supertest(app)
      .put('/api/balance')
      .send({ balance: -300 })
      .expect(400);
  });
});
