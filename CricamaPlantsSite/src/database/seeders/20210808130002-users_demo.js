'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Users', null, {})
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
