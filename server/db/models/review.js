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
        foreignKey: 'authorId',
        as: 'author',
      });
      this.belongsTo(models['Listing']);

      this.hasMany(models['Listing'], {
        foreignKey: {
          allowNull: false,
          field: 'review',
        },
        onDelete: 'SET NULL',
      });
    }
  }
  Review.init(
    {
      comment: DataTypes.STRING,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Review',
    }
  );

  return Review;
};
