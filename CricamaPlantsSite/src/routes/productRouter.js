let express = require('express')
let router = express.Router();
const productController = require('../controllers/productController');
const path = require('path');

//Routes
router.get("/productCar",productController.productCar);
router.get("/productDetail",productController.productDetail);
router.get("/productLoad",productController.productLoad);

module.exports = router;