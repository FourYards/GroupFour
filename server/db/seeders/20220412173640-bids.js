'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Bids',
      [
        // on listing 1
        {
          amount: 3000,
          bidder: 3,
          listing: 1,
        },
        {
          amount: 2500,
          bidder: 4,
          listing: 1,
        },
        {
          amount: 1500,
          bidder: 3,
          listing: 1,
        },

        // on listing 2
        {
          amount: 1750,
          bidder: 4,
          listing: 2,
        },
        {
          amount: 1350,
          bidder: 3,
          listing: 2,
        },

        // on listing 3
        {
          amount: 1475,
          bidder: 4,
          listing: 3,
        },

        // on listing 4
        {
          amount: 3000,
          bidder: 3,
          listing: 4,
        },
        {
          amount: 2700,
          bidder: 4,
          listing: 4,
        },
        {
          amount: 1600,
          bidder: 3,
          listing: 4,
        },
        {
          amount: 1400,
          bidder: 4,
          listing: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bids', null, {});
  },
};
