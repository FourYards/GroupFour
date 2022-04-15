'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('TypesOfWork', [
      { description: 'Lawn Mowing' },
      { description: 'Raking' },
      { description: 'Snow Clearing' },
      { description: 'Plant Pruning' },
      { description: 'Housework' },
      { description: 'Other' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TypesOfWork', null, {});
  },
};
