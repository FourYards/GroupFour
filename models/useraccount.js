'use strict';

const { Model } = require('sequelize');

const { Role } = require('./role');
const { DisplayType = require('./displaytype');

module.exports = (sequelize, DataTypes) => {
  class UserAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserAccount.init({
    emailAddress: DataTypes.STRING,
    realName: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    role: {
      type: DataTypes.INTEGER,
      references: "Roles",
      referencesKey: "id",
    },
    displayType: {
      type: DataTypes.INTEGER,
      references: "DisplayTypes",
      referencesKey: "id",
    }
  }, {
    sequelize,
    modelName: 'UserAccount',
  });

  UserAccount.hasOne(Role);
  UserAccount.hasOne(DisplayType);

  return UserAccount;
};
