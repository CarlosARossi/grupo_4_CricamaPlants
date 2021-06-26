let express = require('express')
let router = express.Router();
const productController = require('../controllers/productController');
const path = require('path');

//Routes
router.get("/productCar",productController.productCar);
router.get("/productDetail",productController.productDetail);
router.get("/productLoad",productController.productLoad);

module.exports = router;


/* router.get("/",product.index)

router.get("/create",product.create)

router.get("/:id",product.show)

router.get("/edit/:id",product.edit)

router.post("/save",[upload.single("image")],product.save)

router.put("/update/:id",[upload.single("image")],product.update)

router.delete("/delete/:id",product.delete) */