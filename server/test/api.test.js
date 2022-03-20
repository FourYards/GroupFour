const supertest = require('supertest');
const createServer = require('./testserver');

const app = createServer();

// Test to get a user's balance
test('GET /api/balance', async () => {
  await supertest(app)
    .get('/api/balance')
    .expect(200)
    .then((response) => {
      console.log('We recieved a user balance of, ' + response.body.balance);
      expect(response.body.balance).toBe(0); // this instance is not signed in so it should have no balance
    });
});
