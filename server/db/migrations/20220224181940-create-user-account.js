'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAccounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      emailAddress: {
        type: Sequelize.STRING,
      },
      realName: {
        type: Sequelize.STRING,
      },
      passwordHash: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      displayType: {
        type: Sequelize.STRING,
        references: {
          model: 'DisplayTypes',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserAccounts');
  },
};
