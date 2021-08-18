'use strict';

const userModel = require("../../models/userModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
        let users = userModel.all().map(user => user.type)//mapea el JSON de users y devuelve un array con todos los tipos
        let filter = users.filter((item,index,array) =>  array.indexOf(item) == index)//filtra todos los tipos, eliminando los duplicados
        let types = filter.map(type => Object({type:type}))//convierte el array en un objeto literal
        
        await queryInterface.bulkInsert('userTypes', types)
        
    } catch (error) {
        console.log(error)
    }
    
    
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('userTypes', null);

  }
};