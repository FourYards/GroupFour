'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['UserAccount'], {
        foreignKey: 'creatorId',
        as: 'creator',
      });
      this.belongsTo(models['Location'], {
        foreignKey: 'placeId',
        as: 'place',
      });
      this.belongsTo(models['TypeOfWork'], {
        foreignKey: 'type',
        as: 'typeDetails',
      });
      this.belongsTo(models['WorkStatus'], {
        foreignKey: 'status',
        as: 'workStatusDetails',
      });

      this.hasMany(models['Bid'], {
        foreignKey: {
          allowNull: false,
          field: 'listing',
          name: 'listingId',
        },
        onDelete: 'CASCADE',
        as: 'bids',
      });

      this.hasMany(models['Review'], {
        foreignKey: {
          allowNull: true,
          field: 'listing',
          name: 'listingId',
        },
        onDelete: 'SET NULL',
        as: 'providerReviews',
      });
    }
  }
  Listing.init(
    {
      description: DataTypes.STRING,
      lengthInMinutes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Listing',
    }
  );

  return Listing;
};
