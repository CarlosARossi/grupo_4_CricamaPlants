let express = require('express')
let router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');

//Routes
router.get("/login",userController.login);
router.get("/register",userController.register);
router.get("/admin",userController.admin);

module.exports = router;