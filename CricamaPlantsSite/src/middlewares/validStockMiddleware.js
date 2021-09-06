const { body } = require("express-validator");
const path = require('path');
const db = require('../database/models');

module.exports =  [
    body('quantity').custom(async (value, { req }) => {
        let product = await db.Product.findByPk(req.body.product);
        if(value > product.quantity){
            return Promise.reject('Solo nos quedan ' + product.quantity + ' unidades');
        }
        return true
    })
]