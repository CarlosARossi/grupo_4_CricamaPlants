'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.createTable('userTypes', { 
        id_user_type: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true 
        },
        cretaed_at:{
          type: Sequelize.DATE,
          allowNull: false,
          defaulValue: Sequelize.NOW
        },
        updated_at:{
          type: Sequelize.DATE,
          allowNull: false,
          defaulValue: Sequelize.NOW
        },
        type:{
          type: Sequelize.STRING,
          allowNull: false,
        }
      })

      /* await queryInterface.addIndex("Users", "idx-users-products", ["products"]) */

        }catch (error){
          throw error;
          }
  },

  down: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.dropTable('userTypes');
    }catch(error){
      throw error;
    }  
  }
};
