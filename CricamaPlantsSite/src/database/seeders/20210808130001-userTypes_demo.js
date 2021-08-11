'use strict';

const usersTypes = require("../CricamaPlantsSite/src/models/usersTypesModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Users_types', usersTypes.all(), {})
    
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('Users_types', null, {});

  }
};
