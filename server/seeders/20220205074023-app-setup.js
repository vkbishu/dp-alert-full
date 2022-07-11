'use strict';
var bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      return Promise.all([
        // admin creation
        queryInterface.bulkInsert('admin', [{
          name: 'Vk bishu',
          username: 'vkbishu@dpalert',
          password: await bcrypt.hash('bishu@droppricealert', 10),
          created_at: new Date(),
          updated_at: new Date()
        }], {transaction: t}),

        // app default settings
        queryInterface.bulkInsert('settings', [{
          setting_key: 'enable_proxy',
          setting_value: 'no',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          setting_key: 'proxy_api_id',
          setting_value: '0',
          created_at: new Date(),
          updated_at: new Date()
        }], {transaction: t}),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('admin', null, {transaction: t}),
        queryInterface.bulkDelete('settings', null, {transaction: t})
      ]);
    });
  }
};
