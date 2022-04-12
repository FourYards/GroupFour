'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Listings',
      [
        {
          description: 'Need someone to clean up my front yard',
          lengthInMinutes: 70,
          creator: 2,
          place: 2,
          type: 2,
          status: 1,
        },
        {
          description: 'Weekly lawnmowing post',
          lengthInMinutes: 30,
          creator: 2,
          place: 3,
          type: 1,
          status: 3,
        },
        {
          description: 'It snowed in April???',
          lengthInMinutes: 30,
          creator: 3,
          place: 4,
          type: 3,
          status: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Listings', null, {});
  },
};
