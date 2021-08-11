'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.createTable('userProducts', { 
        id_user_products: {
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
        id_user:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model: "users",
            key: "id_user"
          }
        },
        id_product:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model: "products",
            key: "id_product"
          },
          quantity:{
            type: Sequelize.INTEGER
          },
          price:{
            type: Sequelize.INTEGER,
          }
        },

      })

      //await queryInterface.addIndex("Users-products", "idx-users", ["Users"])
      //await queryInterface.addIndex("Users-products", "idx-products", ["Products"])

        }catch (error){
          throw error;
          }
  },

  down: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.dropTable('userProducts');
    }catch(error){
      throw error;
    }  
  }
};
