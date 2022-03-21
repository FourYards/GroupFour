'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Roles', [
      {
        name: 'User',
        code: 'U',
      },
      {
        name: 'Owner',
        code: 'O',
      }
    ]);

    await queryInterface.bulkInsert('DisplayTypes', [
      { 
        name: 'Customer',
        code: 'C',
      },
      { 
        name: 'Provider',
        code: 'P',
      },
    ]);

    await queryInterface.bulkInsert('USStates', [
      { id: 'AL' },
      { id: 'AK' },
      { id: 'AZ' },
      { id: 'AR' },
      { id: 'CA' },
      { id: 'CO' },
      { id: 'CT' },
      { id: 'DE' },
      { id: 'FL' },
      { id: 'GA' },
      { id: 'HI' },
      { id: 'ID' },
      { id: 'IL' },
      { id: 'IN' },
      { id: 'IA' },
      { id: 'KS' },
      { id: 'KY' },
      { id: 'LA' },
      { id: 'ME' },
      { id: 'MD' },
      { id: 'MA' },
      { id: 'MI' },
      { id: 'MN' },
      { id: 'MS' },
      { id: 'MO' },
      { id: 'MT' },
      { id: 'NE' },
      { id: 'NV' },
      { id: 'NH' },
      { id: 'NJ' },
      { id: 'NM' },
      { id: 'NY' },
      { id: 'NC' },
      { id: 'ND' },
      { id: 'OH' },
      { id: 'OK' },
      { id: 'OR' },
      { id: 'PA' },
      { id: 'RI' },
      { id: 'SC' },
      { id: 'SD' },
      { id: 'TN' },
      { id: 'TX' },
      { id: 'UT' },
      { id: 'VT' },
      { id: 'VA' },
      { id: 'WA' },
      { id: 'WV' },
      { id: 'WI' },
      { id: 'WY' },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Role', null);
    await queryInterface.bulkDelete('DisplayTypes', null);
    await queryInterface.bulkDelete('USStates', null);
  }
};
