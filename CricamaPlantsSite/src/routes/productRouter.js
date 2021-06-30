//Requiere
const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');

//Route for images
let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        if(extension.indexOf("jpg") > 0){
            cb(null, path.resolve(__dirname,"../../public/uploads","products"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage:dest});


//Routes
router.get("/productCar",productController.productCar);

//Product Detail
router.get("/productDetail/:id",productController.productDetail);

//List of all products
router.get("/products/:category?",productController.list);

/* //List of products by category
router.get("/products/:category",productController.category); */

//Create product
router.get("/productCreate",productController.create);
router.post("/save",[upload.single("image")],productController.save);

//Edit product
router.get("/productEdit/:id",productController.productEdit);
router.put("/saveEdition/:id",[upload.single("image")],productController.saveEdition);

//Delete product

module.exports = router;