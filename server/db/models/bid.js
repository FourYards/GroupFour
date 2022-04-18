'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['UserAccount'], {
        foreignKey: {
          name: 'bidderId',
          allowNull: false,
          field: 'bidder',
        },
        onDelete: 'CASCADE',
        as: 'bidder',
      });
      this.belongsTo(models['Listing'], {
        foreignKey: {
          allowNull: false,
          field: 'listing',
          name: 'listingId',
        },
        onDelete: 'CASCADE',
        as: 'listing',
      });
    }
  }
  Bid.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Bid',
    }
  );

  return Bid;
};
