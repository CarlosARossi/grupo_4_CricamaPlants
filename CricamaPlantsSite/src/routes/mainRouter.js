let express = require('express')
let router = express.Router();
const mainController = require('../controllers/mainController');
const path = require('path');

//Routes
router.get("/",mainController.index);
router.get("/login",mainController.login);
router.get("/register",mainController.register);
router.get("/productCar",mainController.productCar);
router.get("/productDetail",mainController.productDetail);
router.get("/productLoad",mainController.productLoad);

module.exports = router;