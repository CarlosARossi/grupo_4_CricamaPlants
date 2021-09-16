//Require
const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require ('multer');


//Middlewares
const validProduct = require("../middlewares/validProductMiddleware");
const validEditProduct = require("../middlewares/validEditProductMiddleware");
const uploadFile = require("../middlewares/uploadFileMiddleware");
const upload = multer({storage:uploadFile('products')});
const validStock = require("../middlewares/validStockMiddleware");


//Routes

//Product Cart
router.get("/shopCart",productController.shopCart);
router.post("/shopCart/add",validStock,productController.createCart);
router.post("/updateCart/:id",productController.updateCart);
router.delete("/deleteCart/:id",productController.deleteCart);
router.post("/shopCart/buy",validStock,productController.buyCart);

//Product Detail
router.get("/productDetail/:id",productController.productDetail);

//List of all products and products by category
router.get("/products/:category?",productController.list);

//List of all products out of stock
router.get("/productsOutOfStock",productController.OutOfStock);

//Search a product by name
router.post("/searchProduct",productController.searchProduct);

//Create product
router.get("/productCreate",productController.create);
router.post("/save",[upload.single("image")],validProduct,productController.save);

//Edit product
router.get("/productEdit/:id",productController.productEdit);
router.put("/saveEdition/:id",[upload.single("image")],validEditProduct,productController.saveEdition);

//Delete product
router.delete("/productDelete/:id",productController.delete);

//APIs
router.get("/api/products", productController.productsAPIs)
router.get("/api/products/:id", productController.productsAPIsID)

module.exports = router;


/*
//Creación de productos

router.get('/create', productController.create);
router.post("/save",[upload.single("image")],productController.save);
router.get('/productDetail/:id', productController.productDetail);
router.get("/productEdit/:id",productController.productEdit);
router.put("/saveEdition/:id",[upload.single("image")],productController.saveEdition);
router.delete("/productDelete/:id",productController.delete);




module.exports = router;
*/
