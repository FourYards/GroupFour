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
      this.belongsTo(models['Role'], { foreignKey: 'role', as: 'roleDetails' });
      this.belongsTo(models['DisplayType'], {
        foreignKey: 'displayType',
        as: 'displayTypeDetails',
      });

      this.hasMany(models['Bid'], {
        foreignKey: {
          allowNull: false,
          field: 'bidder',
          name: 'bidderId',
        },
        onDelete: 'CASCADE',
        as: 'bids',
      });

      this.hasMany(models['Listing'], {
        foreignKey: {
          allowNull: false,
          field: 'creator',
          name: 'creatorId',
        },
        onDelete: 'SET NULL',
        as: 'listings',
      });

      this.hasMany(models['Location'], {
        foreignKey: {
          allowNull: false,
          field: 'owner',
          name: 'ownerId',
        },
        onDelete: 'CASCADE',
        as: 'locations',
      });

      this.hasMany(models['Review'], {
        foreignKey: {
          allowNull: false,
          field: 'author',
          name: 'authorId',
        },
        onDelete: 'SET NULL',
        as: 'reviews',
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
