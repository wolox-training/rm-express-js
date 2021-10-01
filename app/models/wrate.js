'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wrate = sequelize.define(
    'Wrate',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
      },
      score: DataTypes.INTEGER
    },
    {}
  );
  Wrate.associate = models => {
    Wrate.belongsTo(
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
  return Wrate;
};
