'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'score', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
    queryInterface.addColumn('users', 'position', {
      type: Sequelize.STRING,
      defaultValue: 'Developer'
    });
    queryInterface.createTable('Wrates', {
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
  down: queryInterface => {
    queryInterface.dropTable('Wrates');
    queryInterface.removeColumn('users', 'position');
    queryInterface.removeColumn('users', 'score');
  }
};
