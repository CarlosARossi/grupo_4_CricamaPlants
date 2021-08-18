'use strict';

const categories = require("../../models/productModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let products = productModel.all()
    ​
    let categories = products.map(user => product.category)
    ​
    categories = categories.filter((item,index,array) =>  array.indexOf(item) == index)

    await queryInterface.bulkInsert('Categories', categories.all(), {})
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
