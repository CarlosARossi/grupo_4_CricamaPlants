//Requiere
const path = require('path');
const product = require('../models/productModel');


//Functions
const productController = {
    productCar:(req,res) => res.render('products/productCar'),
    productDetail:(req,res) => res.render('products/productDetail',{product:product.search(req.params.id)}),
    productEdit:(req,res) => res.render('products/productEdit',{product:product.search(req.params.id)}),//edit a product by id
    saveEdition: (req,res) =>{
        let result = product.edit(req.body,req.file,req.params.id)
        return result == true ? res.redirect("/products") : res.send("Error al cargar la informacion") 
    },//save the edition of a product
    list:(req,res) => res.render("products/products",{list: req.params.category ? product.category(req.params.category) : product.all(), category: req.params.category ? req.params.category : null}),//list of all products
    create: (req,res) => res.render("products/productCreate"),//form for product creation
    save: (req,res) => {
        let result = product.save(req.body,req.file)
        return result == true ? res.redirect("/products") : res.send("Error al cargar la informacion") 
    },//save new product on products.json
    delete: (req,res) => {
        let result = product.delete(req.params.id);
        return result == true ? res.redirect("/products") : res.send("Error al cargar la informacion") 
    },//delete a product on products.json
    searchProduct:(req,res) => res.render("products/products",{list: product.searchProduct(req.body), keyword: req.body ? req.body.search : null, category: req.params.category ? req.params.category : null})//search for a product by name
}

module.exports = productController;