const path = require('path');

const productController = {
    productCar:(req,res) => res.render('products/productCar'),
    productDetail:(req,res) => res.render('products/productDetail'),
    productLoad:(req,res) => res.render('products/productLoad')
}

module.exports = productController;