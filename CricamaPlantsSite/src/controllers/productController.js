//Require
const path = require('path');
const product = require('../models/productModel');
const users = require('../models/userModel');
const db = require('../database/models');
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


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
                if (req.params.category){
                var category = await db.Category.findOne({where:{ category: req.params.category}})
                var products = await db.Product.findAll({where:{ id_category: category.id_category}})
            }else{
                var category = ""
                var products = await db.Product.findAll()
            }
            return res.render('products/products', {
                list: products, 
                category: category
                
            })
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },

    productDetail: async (req, res) => {
        try{
            let products = await db.Product.findByPk(req.params.id, {include: [{association: "category"}]})
            
            return res.render('products/productDetail', {
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

            return res.render('products/productCreate', {
                categories:categories
            });

        }catch (error){
            return res.send(error)
        }
    },

    save: async (req, res) => {

        try{
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0){
                let product = await db.Product.findByPk(req.params.id);
                let categories = await db.Category.findAll();
                return res.render('products/productCreate', {
                    product: product,
                    categories: categories,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            let newProduct = await db.Product.create({
                    created_at: new Date(),
                    updated_at: new Date(),
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file == undefined ? "/img/products/productDefault.jpg" : "/uploads/products/" + req.file.filename,
                    price: req.body.price,
                    id_category: req.body.category
                    });
                    /* console.log(newProduct) */
        return res.redirect('/productDetail/' + newProduct.id_product)
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },

    productEdit: async (req, res) => {
        try{
            let product = await db.Product.findByPk(req.params.id);
            let category = await db.Category.findAll();

            return res.render('products/productEdit', {
                product:product, 
                category:category
            });
            
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },

    saveEdition: async (req, res) => {
        try{const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0){
                let product = await db.Product.findByPk(req.params.id);
                let category = await db.Category.findAll();
                return res.render('products/productEdit', {
                    product:product, 
                    category:category,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            let productEdit = await db.Product.findByPk(req.params.id)
            let product = await db.Product.update({
                created_at: new Date(),
                updated_at: new Date(),
                name: req.body.name,
                description: req.body.description,
                image: req.file == undefined ? productEdit.image : "/uploads/products/" + req.file.filename,
                price: req.body.price,
                id_category: req.body.category
            }, {
                where: {id_product: req.params.id}
                }
            );
            
            return res.redirect('/productDetail/' + req.params.id)
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },

    delete: async (req, res) => {
        try{
            let productDelete = await db.Product.destroy({where: {id_product: req.params.id}});
            return res.redirect('/');
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },

    searchProduct: async (req, res) => {
        try{
            let product = await db.Product.findAll({where:{ 
                [Op.or]: [
                    {   
                    name: {
                        [Op.like]: `%${req.body.search}%`
                        }
                    },
                    {
                    description: {
                        [Op.like]: `%${req.body.search}%`
                        },
                    }]
                }
            })
            let category = ""
            let keyword = ""
            console.log(product);
            res.render("products/products",{
                list: product, 
                keyword: req.body ? req.body.search : keyword, 
                category: req.params.category ? req.params.category : category
            })
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },//search for a product by name or description

}
    
module.exports = productController;