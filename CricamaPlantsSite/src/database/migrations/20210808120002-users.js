'use strict';

module.exports = {
   up: async (queryInterface, Sequelize) => {
      try{
         await queryInterface.createTable('users', { 
            id_user: {
               type: Sequelize.INTEGER,
               primaryKey: true,
               autoIncrement: true 
            },
            created_at:{
               type: Sequelize.DATE,
               allowNull: false,
               defaulValue: Sequelize.NOW
            },
            updated_at:{
               type: Sequelize.DATE,
               allowNull: false,
               defaulValue: Sequelize.NOW
            },
            first_name:{
               type: Sequelize.STRING,
               allowNull: false,
            },
            last_name:{
               type: Sequelize.STRING,
               allowNull: false,
            },
            email:{
               type: Sequelize.STRING,
               allowNull: false,
               unique: true
            },
            password:{
               type: Sequelize.STRING,
               allowNull: false,
               /* unique: true */
            },
            image:{

            },
            id_user_type:{
               type: Sequelize.INTEGER,
               allowNull: false,
               references:{
                  model: "userTypes",
                  key: "id_user_type" //o user_id?
               }
            } 
         })

         //await queryInterface.addIndex("Users", "idx-users-products", ["products"])

         }catch (error){
            throw error;
         }
   },

   down: async (queryInterface, Sequelize) => {
      try{
         await queryInterface.dropTable('users');
      }catch(error){
         throw error;
      }  
   }
};
