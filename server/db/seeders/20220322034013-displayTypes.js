'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'DisplayTypes',
      [
        {
          name: 'Customer',
        },
        {
          name: 'Provider',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DisplayTypes', null, {});
  },
};
