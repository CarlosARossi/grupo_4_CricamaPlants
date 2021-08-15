//Require
const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require ('multer');


//Middlewares
const uploadFile = require("../middlewares/uploadFileMiddleware");
const upload = multer({storage:uploadFile('products')});


//Routes

//Product Car
router.get("/productCar",productController.productCar);

//Product Detail
router.get("/productDetail/:id",productController.productDetail);

//List of all products and products by category
router.get("/products/:category?",productController.list);

//Search a product by name
router.post("/searchProduct",productController.searchProduct);

//Create product
router.get("/productCreate",productController.create);
router.post("/save",[upload.single("image")],productController.save);

//Edit product
router.get("/productEdit/:id",productController.productEdit);
router.put("/saveEdition/:id",[upload.single("image")],productController.saveEdition);

//Delete product
router.delete("/productDelete/:id",productController.delete)

module.exports = router;


/*
//Creación de productos

router.get('/create', productController.create);
router.post("/save",[upload.single("image")],productController.save);
router.get('/productDetail/:id', productController.productDetail);


module.exports = router;
*/
