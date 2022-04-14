'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // brought to you by random clicking on google maps
    // these streets and zip codes all exist, but the buildings do not exist
    await queryInterface.bulkInsert(
      'Locations',
      [
        {
          streetAddress: '200 Main Street',
          city: 'Buffalo',
          state: 'SD',
          zipCode: '57720',
          owner: 1,
        },
        {
          streetAddress: '1111 Cooper Street',
          city: 'Saline',
          state: 'LA',
          zipCode: '71070',
          owner: 2,
        },
        {
          streetAddress: '808 Brown Trout Road',
          city: 'Hacker Valley',
          state: 'WV',
          zipCode: '26222',
          owner: 2,
        },
        {
          streetAddress: '18750 S Redwood Road',
          city: 'Bluffdale',
          state: 'UT',
          zipCode: '84065',
          owner: 3,
        },
        {
          streetAddress: '1180 N Main Street',
          city: 'Moscow',
          state: 'ID',
          zipCode: '83843',
          owner: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Locations', null, {});
  },
};
