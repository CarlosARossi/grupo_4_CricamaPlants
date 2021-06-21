const path = require('path');

const mainController = {
    index:(req,res) => res.render('index'),
    login:(req,res) => res.render('users/login'),
    register:(req,res) => res.render('users/register'),
    productCar:(req,res) => res.render('products/productCar'),
    productDetail:(req,res) => res.render('products/productDetail'),
    productLoad:(req,res) => res.render('products/productLoad')
}

module.exports = mainController;