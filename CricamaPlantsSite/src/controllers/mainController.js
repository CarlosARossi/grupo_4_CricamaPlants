const path = require('path');

const mainController = {
    index:(req,res) => res.render('index'),
    login:(req,res) => res.render('users/login'),
/*     login:(req,res) => res.sendFile(path.resolve(__dirname,"../views/users","login")), */
    register:(req,res) => res.render('users/register'),
    productCar:(req,res) => res.render('products/productCar'),
    productDetail:(req,res) => res.render('products/productDetail')
}

module.exports = mainController;