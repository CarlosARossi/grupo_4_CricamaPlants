'use strict';

const usersProducts = require ("../CricamaPlantsSite/src/models/usersProductsModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert("Users_products", usersProducts.all(), {}) 
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete("Users_products", null, {});
   
  }
};
