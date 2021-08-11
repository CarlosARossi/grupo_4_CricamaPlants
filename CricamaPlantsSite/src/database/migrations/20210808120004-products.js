'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.createTable('products', { 
        id_product: {
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
        name:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        description:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        image:{
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price:{
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        id_category:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model: "categories",
            key: "id_category"
          }
        }
      }
    )

      //await queryInterface.addIndex("Products", "idx-users", ["Users"])

        }catch (error){
          throw error;
          }
  },

  down: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.dropTable('products');
    }catch(error){
      throw error;
    }  
  }
};
