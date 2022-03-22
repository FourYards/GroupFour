'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models['Role']);
      this.belongsTo(models['DisplayType']);
    }
  }
  UserAccount.init(
    {
      emailAddress: DataTypes.STRING,
      realName: DataTypes.STRING,
      passwordHash: DataTypes.STRING(255),
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserAccount',
    }
  );

  return UserAccount;
};
