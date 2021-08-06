const { body } = require("express-validator");
const path = require('path');
const bcryptjs = require('bcryptjs');
const userModel = require("../models/userModel")


module.exports =  [
    body('email')
        .notEmpty().withMessage('Tenes que escribir tu email').bail()
        .custom(value => {
            let registered = userModel.findByField('email', value);
            if (!registered) {
                return Promise.reject('No te encontramos, registrate!');
            }
            return true
        }),
    body("password")
        .isLength({ min: 2 }).withMessage('Escribi tu contraseña!').bail()
        .custom((value, { req }) => {

            let registered = userModel.findByField('email',req.body.email);
        
            if (bcryptjs.compareSync(value, registered.password) != true) {
                return Promise.reject('Mmmm...pone de vuelta la contraseña');
            }
    
            return true;
        })
]
