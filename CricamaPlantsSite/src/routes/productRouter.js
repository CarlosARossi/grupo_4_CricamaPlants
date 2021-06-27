//Requiere
let express = require('express')
let router = express.Router();
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');

//Routes

router.get("/productCar",productController.productCar);
router.get("/productDetail",productController.productDetail);

//List of all products
router.get("/products",productController.list);

//Create product
router.get("/productCreate",productController.create);
router.post("/save",productController.save);


router.get("/productEdit",productController.productEdit);


module.exports = router;

