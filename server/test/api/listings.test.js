const supertest = require('supertest');
const createServer = require('../testserver');
// const db = require('../../db/models');
// const Listing = db.Listing;

const app = createServer();

// var mockData = {
//   listings: [],
//   user: null,
//   role: null,
// }

// beforeAll(async () => {
//   // Create listing with no owner
//   for(let i=0; i < 10; i++) {
//     mockData.listings.push(await Listing.create());
//   }

//   // Create a testing user role
//   mockData.role = db.Role.create({code:'tst', name:'tst'});

//   // Create a testing user
//   mockData.user = db.UserAccount.create({RoleCode:'tst'})

//   // Create listing made by the testing user
//   for(let i=0; i < 10; i++) {
//     mockData.listings.push(await Listing.create({UserAccountId: mockData.user.id}));
//   }
// })

// afterAll(async () => {
//   for(let list of mockData.listings) {
//     list.destroy();
//   }
//   mockData.user.destroy();
//   mockData.role.destroy();
// })

describe('GET a listing with id 1', () => {
  it('Responds with a json object containing the listing', async () => {
    await supertest(app)
      .get('/api/listing?id=1')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(1);
      });
  });
});

describe('GET all listing posted by user with id 1', () => {
  it('Responds with a json object containing the listings', async () => {
    await supertest(app)
      .get('/api/listing?creator=1')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBeDefined;
        for (let listing of response.body.data) {
          expect(listing.UserAccountId).toBe(1);
          console.log(listing);
        }
      });
  });
});

describe('GET listing that have not been complete', () => {
  it('Responds with a json object containing recent listings', async () => {
    await supertest(app)
      .get('/api/listing')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body.data).toBeDefined;
      });
  });
});
