'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('WorkStatuses', [
      { description: 'Awaiting Provider' },
      { description: 'Awaiting Beginning' },
      { description: 'Awaiting Completion' },
      { description: 'Awaiting Approval' },
      { description: 'Awaiting Reviews' },
      { description: 'Completed' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
