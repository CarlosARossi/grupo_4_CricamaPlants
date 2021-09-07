const { body } = require("express-validator");
const path = require('path');
const db = require('../database/models');

module.exports =  [
    body('quantity').custom(async (value, { req }) => {
        let product = await db.Product.findByPk(req.body.product);
        console.log('entre');
        console.log(product.quantity);
        if(value > product.quantity){
            console.log('error');
            return Promise.reject('Solo nos quedan ' + product.quantity + ' unidades');
        }
        return true
    })
]