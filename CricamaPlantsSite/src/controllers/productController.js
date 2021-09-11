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

    /*--------------------- SHOPCART ---------------------*/

    shopCart: async (req, res) => {
        try {
            if(!req.session.userLogged){
                res.redirect('/login')
            }
            const products = await db.Product.findAll();
            const user = req.session.userLogged ? await db.User.findByPk(req.session.userLogged.id_user) : "";
            const shopCart = req.session.userLogged ? await db.ShopCart.findAll({where: {id_user: req.session.userLogged.id_user},include: [{association: "product"},{association: "user"}]}) : "";
            let totalPrice = 0;
            for (let i = 0; i < shopCart.length; i++) {
                totalPrice += (Number(shopCart[i].product.price)*Number(shopCart[i].quantity))
            }
            
            res.render('products/shopCart',{
                user: user,
                products: products,
                shopCart: shopCart,
                totalPrice: totalPrice
            })

        } catch (error) {
            console.log(error)
            return res.send(error)
        }
    },

    createCart: async (req, res) => {
        try {
            const user = req.session.userLogged ? await db.User.findByPk(req.session.userLogged.id_user, {include: [{association: "userType"}]}) : "";
            const shopCart = req.session.userLogged ? await db.ShopCart.findAll({include: ['product', 'user']},{where: {id_user: req.session.userLogged.id_user}}) : "";
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0){
                let products = await db.Product.findByPk(req.body.product, {include: [{association: "category"}]})
                return res.render('products/productDetail', {
                    product: products,
                    user: user,
                    shopCart: shopCart,
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            if(!req.session.userLogged){
                res.redirect('/login')
            }
            const product = await db.Product.findByPk(req.body.product)
            const createCart = await db.ShopCart.create({
                id_user: req.body.user,
                id_product: product.id_product,
                quantity: req.body.quantity,
                price: product.price,
                created_at: Date.now(),
                updated_at: Date.now(),
            })
            res.redirect('/shopCart')
        } catch (error) {
            console.log(error)
            return res.send(error)
        }
    },

    updateCart: async (req, res) => {
        try {
            res.send({data: req.body, id: req.params.id})
        } catch (error) {
            console.log(error)
            return res.send(error)
        }
    },

    deleteCart: async (req, res) => {
        try{
            let productCartDelete = await db.ShopCart.destroy({where: {id_shop: req.params.id}});
            return res.redirect('/shopCart');
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },

    buyCart: async (req, res) => {
        try {
            const shopCart = await db.ShopCart.findAll({include: ['product', 'user']},{where: {id_user: req.session.userLogged.id_user}});
            
            shopCart.forEach(async element => {
                const product = await db.Product.findByPk(element.id_product)
                console.log(product);
                const productEdit = await db.Product.update({
                    updated_at: new Date(),
                    quantity: product.quantity - element.quantity,
                }, {
                    where: {id_product: element.id_product}
                    }
                );
            });

            const emptyCart = await db.ShopCart.destroy({where: {id_user: req.session.userLogged.id_user}});

            return res.redirect('/shopCart');
        } catch (error) {
            console.log(error)
            return res.send(error)
        }
    },

    /*--------------------- PRODUCTS ---------------------*/

    productDetail: async (req, res) => {
        try{
            const user = req.session.userLogged ? await db.User.findByPk(req.session.userLogged.id_user, {include: [{association: "userType"}]}) : "";
            const shopCart = req.session.userLogged ? await db.ShopCart.findAll({include: ['product', 'user']},{where: {id_user: req.session.userLogged.id_user}}) : "";
            let products = await db.Product.findByPk(req.params.id, {include: [{association: "category"}]})
            return res.render('products/productDetail', {
                product: products,
                user: user,
                shopCart: shopCart
            })
            }catch (error){
                return res.send(error)
            }
    },

    create: async (req, res) => {
        try{
            if(req.session.userLogged != undefined){
                if(req.session.userLogged.userType.type == "admin"){//Habilita la lista de usuarios si el userLogged es admin
                    let categories = await db.Category.findAll()

                    return res.render('products/productCreate', {
                        categories:categories
                    });
                }
                else{
                    return res.render('not-found')
                }
            }else{
                return res.render('not-found')
            }

        }catch (error){
            console.log(error)
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
                    quantity: req.body.quantity,
                    id_category: req.body.category
                    });

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
                quantity: req.body.quantity,
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

    /*--------------------- OTHERS ---------------------*/

    list: async (req, res) => {
        try{
            const user = req.session.userLogged ? await db.User.findByPk(req.session.userLogged.id_user) : "";
            const shopCart = req.session.userLogged ? await db.ShopCart.findAll({where: {id_user: req.session.userLogged.id_user},include: [{association: "product"},{association: "user"}]}) : "";
            
            if (req.params.category){
                var category = await db.Category.findOne({where:{ category: req.params.category}})
                var products = await db.Product.findAll({where:{ id_category: category.id_category}})
            }else{
                var category = ""
                var products = await db.Product.findAll()
            }
            return res.render('products/products', {
                list: products, 
                category: category,
                user:user,
                shopCart:shopCart
            })
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

    OutOfStock: async (req, res) => {
        try{
            const user = req.session.userLogged ? await db.User.findByPk(req.session.userLogged.id_user) : "";
            const shopCart = req.session.userLogged ? await db.ShopCart.findAll({where: {id_user: req.session.userLogged.id_user},include: [{association: "product"},{association: "user"}]}) : "";
            var category = await db.Category.findAll()
            var products = await db.Product.findAll({where:{ quantity: 0},include: [{association: "category"}]})
            return res.render('products/productsOutOfStock', {
                list: products, 
                category: category,
                user:user,
                shopCart:shopCart
            })
        }catch (error){
            console.log(error)
            return res.send(error)
        }
    },
}
    
module.exports = productController;