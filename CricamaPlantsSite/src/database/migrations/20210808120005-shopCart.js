'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.createTable('shopCart', { 
        id_shop: {
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
        quantity:{
          type: Sequelize.INTEGER,
        },
        price:{
          type: Sequelize.DECIMAL(10, 2),
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
          }
        }
      }
    )

      //await queryInterface.addIndex("Users-products", "idx-users", ["Users"])
      //await queryInterface.addIndex("Users-products", "idx-products", ["Products"])

    }catch (error){
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.dropTable('shopCart');
    }catch(error){
      throw error;
    }  
  }
};
