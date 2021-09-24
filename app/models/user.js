module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, field: 'id' },
      firstName: { type: DataTypes.STRING, allowNull: false, field: 'first_name' },
      lastName: { type: DataTypes.STRING, allowNull: false, field: 'last_name' },
      email: { type: DataTypes.STRING, allowNull: false, field: 'email', unique: true },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {
      timestamps: false
    }
  );
  return User;
};
