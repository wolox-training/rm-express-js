'use strict';
module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'content'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
      }
    },
    {
      timestamps: true,
      underscored: true
    }
  );
  Weet.associate = models => {
    Weet.belongsTo(
      models.User,
      {
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      },
      {
        underscored: true
      }
    );
  };
  return Weet;
};
