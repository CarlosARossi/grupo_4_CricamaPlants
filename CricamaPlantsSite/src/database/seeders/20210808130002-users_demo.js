'use strict';

const users = require("../CricamaPlantsSite/src/models/userModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('Users', users.all(), {})
     
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
