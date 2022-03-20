'use strict';

// Placeholder cookie secret to suppress error that is not relevant
// This keeps express from complaining about not providing a session secret.
// Since this just creates the DB table, the session secret is never used.
// (session secret is only used for session cookie)
process.env.COOKIE_SECRET = 'THIS IS A PLACEHOLDER THAT WILL NOT BE USED';

const { sequelizeStore } = require('../../middleware/session');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    await sequelizeStore.sync();
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  },
};
