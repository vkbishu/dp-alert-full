'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      seller: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.TEXT
      },
      affiliate: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      org_price: {
        type: Sequelize.FLOAT(10,2),
        allowNull: false,
        defaultValue: 0
      },
      fetched_price: {
        type: Sequelize.FLOAT(10,2),
        allowNull: false,
        defaultValue: 0
      },
      current_price: {
        type: Sequelize.FLOAT(10,2),
        allowNull: false,
        defaultValue: 0
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

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('products');
  }
};
