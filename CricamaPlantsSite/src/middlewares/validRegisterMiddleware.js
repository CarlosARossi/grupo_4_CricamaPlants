const { body } = require("express-validator");
const path = require('path');
const userModel = require("../models/userModel");
const db = require('../database/models');

module.exports =  [
    body('firstName')
        .notEmpty().withMessage('Tenes que escribir tu nombre').bail()
        .isLength({ min: 2 }).withMessage('Nombre muy corto'),
    body('lastName')
        .notEmpty().withMessage('Tenes que escribir tu apellido').bail()
        .isLength({ min: 2 }).withMessage('Apellido muy corto'),
    body('email')
        .notEmpty().withMessage('Tenes que escribir tu email').bail()
        .isEmail().withMessage('Formato de mail inválido').bail()
        .custom(async value => {
            /* let registered = userModel.findByField('email', value); */
            let registered = await db.User.findOne({where:{ email: value}});

            if (registered) {
                return Promise.reject('Ya estas registrado');
            }
            return true
        }),
    body('password')
        .notEmpty().withMessage('Tenes que escribir una contraseña').bail()
        .isLength({ min: 8 }).withMessage('Contraseña muy corta, debe tener al menos 8 caracteres')
        .matches(/\d/).withMessage('La contraseña debe tener un número'),
    body('passwordConfirm')
        .notEmpty().withMessage('Tenes que repetir la contraseña').bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('No coinciden las contraseñas');
            }
            return true;
        }),
    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg'];

        if (file == undefined){
            throw new Error ('Dale! Subi una foto...');
        } else{
            let extension = path.extname(file.originalname);
            if  (!acceptedExtensions.includes(extension)) {
                throw new Error(`Solo aceptamos archivos ${acceptedExtensions.join(', ')}`);//REVISAR
            }
        }

        return true;
    })
]