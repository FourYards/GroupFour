'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'DisplayTypes',
      [
        {
          name: 'Customer',
          code: 'CUS',
        },
        {
          name: 'Provider',
          code: 'PRO',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DisplayTypes', null, {});
  },
};
