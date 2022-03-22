const supertest = require('supertest');
const createServer = require('../testserver');

const app = createServer();

describe('GET a bid with id 1', () => {
  it('Responds with a json object containing the bid info', async () => {
    await supertest(app)
      .get(`/api/bid?id=1`)
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        console.log(response.body);
        expect(response.body.bidder_id).toBe(1);
        expect(response.body.order_id).toBe(1);
        expect(response.body.amount).toBe(100.0);
      });
  });
});

describe('GET all bids related to a listing', () => {
  it('Responds with a json object containing an array of bids', async () => {
    await supertest(app)
      .get('/api/bid/?order_id=1')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBeDefined;
      });
  });
});
