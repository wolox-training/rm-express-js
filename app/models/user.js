'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id'
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email',
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        field: 'is_admin',
        defaultValue: false
      },
      points: {
        type: DataTypes.INTEGER,
        field: 'points',
        defaultValue: 0
      },
      position: {
        type: DataTypes.STRING,
        field: 'position',
        defaultValue: 'Developer'
      }
    },
    {
      timestamps: true,
      underscored: true
    }
  );

  User.beforeUpdate(user => {
    // eslint-disable-next-line no-console
    console.log(user.dataValues);
  });

  return User;
};
