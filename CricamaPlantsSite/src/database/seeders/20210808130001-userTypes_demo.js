'use strict';

const userModel = require("../../models/userModel")

let users = userModel.all()
      ​let types = users.map(user => user.type)
      ​
          types = types.filter((item,index,array) =>  array.indexOf(item) == index)
          console.log(types)
      

module.exports = {
  up: async (queryInterface, Sequelize) => {
     try {
      
          await queryInterface.bulkInsert('userTypes', [{
            type: "admin",
          },{
          type: "user"
        }])
          
    } catch (error) {
      console.log(error)
    }
    
    
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('userTypes', null);

  }
};


​
​