'use strict';

const productModel = require("../../models/productModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
        let products = productModel.all().map(product => product.category)
        let productsFilter = products.filter((item,index,array) =>  array.indexOf(item) == index)
        let categories = productsFilter.map(category => Object({category:category}))
        
        await queryInterface.bulkInsert('categories', categories)

    } catch (error) {
        console.log(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('categories', null);
    
  }
};
