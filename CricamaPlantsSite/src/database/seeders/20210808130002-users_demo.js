'use strict';

const userModel = require("../../models/userModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      let id_user = userModel.all().map(user => user.id)
      let firstName = userModel.all().map(user => user.firstName)
      let lastName = userModel.all().map(user => user.lastName)
      let email = userModel.all().map(user => user.email)
      let password = userModel.all().map(user => user.password)
      let image = userModel.all().map(user => user.image)
      let type = userModel.all().map(user => user.type)
      
      let users = [{
        id_user: "",
        first_Name: "",
        last_Name: "",
        email: "",
        password: "",
        image: "",
        type: ""
      }]

      for (let i = 0; i < id_user.length; i++) {
        users[i] = {
          id_user: id_user[i],
          first_name: firstName[i],
          last_name: lastName[i],
          email: email[i],
          password: password[i],
          image: image[i],
          id_user_type: "1"
        }
        
      }

      console.log(users)
      
      await queryInterface.bulkInsert('Users', users)
      
  } catch (error) {
      console.log(error)
  }
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Users', null);
    
  }
};
