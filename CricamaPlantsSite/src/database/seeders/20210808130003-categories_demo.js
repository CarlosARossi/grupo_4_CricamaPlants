'use strict';

const categories = require("../CricamaPlantsSite/src/models/categoriesModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Categories', categories.all(), {})
     
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
