'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'points', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    await queryInterface.addColumn('users', 'position', {
      type: Sequelize.STRING,
      defaultValue: 'Developer'
    });
    await queryInterface.createTable('wrates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating_user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      weet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'weets',
          key: 'id'
        }
      },
      score: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('wrates');
    await queryInterface.removeColumn('users', 'position');
    await queryInterface.removeColumn('users', 'points');
  }
};
