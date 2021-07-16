const { body } = require("express-validator");
const path = require('path');
const userModel = require("../models/userModel")

module.exports =  [
    body('firstName').notEmpty().withMessage('Tenes que escribir tu nombre'),
    body('lastName').notEmpty().withMessage('Tenes que escribir tu apellido'),
    body('email')
        .notEmpty().withMessage('Tenes que escribir tu email').bail()
        .isEmail().withMessage('Formato de mail inválido').bail()
        .custom(value => {
            let registered = userModel.findByField('email', value);
            if (registered) {
                return Promise.reject('Ya estas registrado');
            }
            return true
        }),
    body('password')
        .notEmpty().withMessage('Tenes que escribir una contraseña').bail()
        .isLength({ min: 5 }).withMessage('Contraseña muy corta (a partir de 6 esta OK)'),
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
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file){
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