'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    

    await queryInterface.bulkInsert('Categories', null, {})
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
