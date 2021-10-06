'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
      },
      score: DataTypes.INTEGER
    },
    { timestamps: true, underscored: true }
  );
  Rating.associate = models => {
    Rating.belongsTo(
      models.User,
      {
        foreignKey: {
          name: 'ratingUserId',
          allowNull: false
        }
      },
      models.Weet,
      {
        foreignKey: {
          name: 'weetId',
          allowNull: false
        }
      },
      {
        underscored: true
      }
    );
  };
  return Rating;
};
