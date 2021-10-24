const { body } = require("express-validator");
const path = require('path');
const db = require('../database/models');

module.exports =  [
    body('name')
        .notEmpty().withMessage('Tenes que escribir un nombre de producto')
        .isLength({ min: 5 }).withMessage('Nombre de producto muy corto')
        .isLength({ max: 25 }).withMessage('Nombre de producto muy largo')
        .custom(async value => {
            let created = await db.Product.findOne({where:{ name: value}});

            if (created) {
                return Promise.reject('Ya está creado este articulo');
            }
            return true
        }),
    body('description')
        .notEmpty().withMessage('Tenes que escribir una descripción')
        .isLength({ min: 20 }).withMessage('La descripción tiene que tener más de 20 caracteres'),        
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
    }),
    body('price')
        .notEmpty().withMessage('Te faltó el precio, o lo vas a regalar?...'),
    body('quantity')
        .notEmpty().withMessage('Te faltó la cantidad, podes poner 0 igual')
]