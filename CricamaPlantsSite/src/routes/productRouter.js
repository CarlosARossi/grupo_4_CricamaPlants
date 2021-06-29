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
router.get("/productDetail",productController.productDetail);

//List of all products
router.get("/products",productController.list);

//Create product
router.get("/productCreate",productController.create);
router.post("/save",[upload.single("image")],productController.save);

//Edit product
router.get("/productEdit",productController.productEdit);

//Delete product

module.exports = router;