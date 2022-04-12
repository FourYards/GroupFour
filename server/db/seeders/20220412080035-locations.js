'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Locations',
      [
        {
          streetAddress: '333 Triangle Way',
          city: 'Logan',
          state: 'UT',
          zipCode: '84321',
          owner: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Locations', null, {});
  },
};
