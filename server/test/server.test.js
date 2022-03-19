/**
 * I am not certain if this testing works yet, this file should test that my supertest is setup
 */
const supertest = require('supertest');
const createServer = require('./testserver');

const app = createServer();

test('GET /api/balance', async () => {
  await supertest(app)
    .get('/api/balance')
    .expect(200)
    .then((response) => {
      console.log('We got this as the response to URL/' + response.body);
    });
});
