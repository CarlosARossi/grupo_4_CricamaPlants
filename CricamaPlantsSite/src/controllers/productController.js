//Require
const path = require('path');
const product = require('../models/productModel');
const users = require('../models/userModel');
const db = require('../database/models');

//Functions for JSON
/* 
const productController = {

    productCar:(req,res) => res.render('products/productCar'),

    productDetail:(req,res) => res.render('products/productDetail',{product:product.search(req.params.id), user:req.session.userLogged}),

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
    
    searchProduct:(req,res) => res.render("products/products",{list: product.searchProduct(req.body), keyword: req.body ? req.body.search : null, category: req.params.category ? req.params.category : null}),//search for a product by name

}

module.exports = productController;   */

//Functions for Databases

const productController = {

    productCar:(req,res) => res.render('products/productCar'),

    list: async (req, res) => {
        try{
            let products = await db.Product.findAll({include: [{association: "category"}]})
            let category = await db.Category.findOne()
            /* return res.send(products) */
            res.render('products/products', {
                list: products,
                category: category
            })
            }catch (error){
                return res.send(error)
            }
            /* list: req.params.category ? product.category(req.params.category) : product.all(), 
            category: req.params.category ? req.params.category : null */
    },

    productDetail: async (req, res) => {
        try{
            let products = await db.Product.findByPk(req.params.id, {include: [{association: "category"}]})
            
            res.render('products/productDetail', {
                product: products,
                user: req.session.userLogged
            })
            }catch (error){
                return res.send(error)
            }
    },

    create: async (req, res) => {
        try{
            let categories = await db.Category.findAll()

            return res.render('products/productCreate', {categories:categories});

        }catch (error){
            return res.send(error)
        }
    },

    save: async (req, res) => {
        try{
            let newProduct = await db.Product.create({
                    created_at: new Date(),//REVISAR
                    updated_at: new Date(),
                    name: req.body.name,
                    description: req.body.description,
                    image: file == undefined ? "/img/products/productDefault.png" : "/uploads/products/" + file.filename,
                    price: req.body.price,
                    id_category: req.body.category
                    });
        
        return newProduct == true ? res.redirect("/products") : res.send("Error al cargar la informacion") 
        }catch (error){
            return res.send(error)
        }
    },

    productEdit: function (req, res) {
        let pedidoProduct = db.Products.findByPk(req.params.id);
        let pedidoCategory = db.Category.findAll();
        
        Promise.all([pedidoProduct, pedidoCategory])
            .then(function ([producto, categoria]) {
                res.render('productEdit', {producto:producto, categoria:categoria});
            })
    },

    saveEdition: function (req, res) {
        db.Products.update({
            created_at: new Date(),
            updated_at: new Date(),
            name: req.body.name,
            description: req.body.description,
            image: typeof file === 'undefined' ? null : file.filename,//REVISAR
            price: req.body.precio,
            /* id_category: db.findByPk(??)
                .then(??) */
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/products/' + req.params.id)
    },

    

    

    delete: function (req, res) {
        db.Products.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/products');
    },

    searchProduct:(req,res) => res.render("products/products",{list: product.searchProduct(req.body), keyword: req.body ? req.body.search : null, category: req.params.category ? req.params.category : null}),//search for a product by name

}
    
module.exports = productController;