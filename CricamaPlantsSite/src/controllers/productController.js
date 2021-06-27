const path = require('path');
const product = require('../models/productModel');

const productController = {
    productCar:(req,res) => res.render('products/productCar'),
    productDetail:(req,res) => res.render('products/productDetail'),
    productEdit:(req,res) => res.render('products/productEdit'),
    list:(req,res) => res.render("products/products",{list:product.all()}),//list of all products
    create: (req,res) => res.render("products/productCreate"),//form for product creation
    save: (req,res) => {
        console.log(req.params)
        let result = product.save(req.body,req.file)
        return result == true ? res.redirect("/products") : res.send("Error al cargar la informacion") 
    },//save new product on products.json
}

module.exports = productController;