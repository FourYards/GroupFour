'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models['UserAccount'], {
        foreignKey: {
          allowNull: false,
          field: 'author',
          name: 'authorId',
        },
        onDelete: 'CASCADE',
        as: 'author',
      });

      this.belongsTo(models['Listing'], {
        foreignKey: {
          allowNull: true,
          field: 'listing',
          name: 'listingId',
        },
        onDelete: 'CASCADE',
        as: 'listing',
      });

      this.belongsTo(models['UserAccount'], {
        foreignKey: {
          allowNull: true,
          field: 'provider',
          name: 'providerId',
        },
        onDelete: 'CASCADE',
        as: 'provider',
      });
    }
  }
  Review.init(
    {
      comment: DataTypes.STRING,
      rating: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );

  return Review;
};
