'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("USStates", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("USStates");
  }
};
