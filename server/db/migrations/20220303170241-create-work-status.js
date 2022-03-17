'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("WorkStatuses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("WorkStatuses");
  }
};
