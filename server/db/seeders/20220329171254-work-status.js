'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('WorkStatuses', [
      { description: 'New' },
      { description: 'In Progress' },
      { description: 'Completed' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
