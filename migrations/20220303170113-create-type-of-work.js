'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("TypesOfWork", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("TypesOfWork");
  }
};
