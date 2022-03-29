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

      this.hasMany(models['Bid'], {
        foreignKey: {
          allowNull: false,
          field: 'bidder',
        },
        onDelete: 'CASCADE',
      });

      this.hasMany(models['Listing'], {
        foreignKey: {
          allowNull: false,
          field: 'creator',
        },
        onDelete: 'SET NULL',
      });

      this.hasMany(models['Location'], {
        foreignKey: {
          allowNull: false,
          field: 'owner',
        },
        onDelete: 'CASCADE',
      });

      this.hasMany(models['Review'], {
        foreignKey: {
          allowNull: false,
          field: 'author',
        },
        onDelete: 'SET NULL',
      });
    }
  }
  UserAccount.init(
    {
      emailAddress: {
        type: DataTypes.STRING,
        unique: true,
      },
      realName: DataTypes.STRING,
      passwordHash: DataTypes.STRING(255),
      phoneNumber: DataTypes.STRING,
      balance: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserAccount',
    }
  );

  return UserAccount;
};
