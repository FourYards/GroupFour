'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Bids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bidder: {
        type: Sequelize.INTEGER,
        references: {
          model: "UserAccount",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      },
      amount: {
        type: Sequelize.INTEGER // not sure what form this will take; maybe just a number of cents?
      },
      order: {
        type: Sequelize.INTEGER,
        references: {
          model: "Listing",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade"
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("Bids");
  }
};
