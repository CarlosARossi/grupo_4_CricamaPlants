//Requieres
let express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');
const multer = require ('multer');
const { body } = require ('express-validator');

//Middlewares
const validRegister = require("../middlewares/validRegisterMiddleware");
const uploadFile = require("../middlewares/uploadFileMiddleware");
const validLogin = require("../middlewares/validLoginMiddleware");

//Routes

//Login User
router.get("/login",userController.login);
router.post("/access",validLogin,userController.access)
//User Profile
router.get("/userProfile/:id",userController.userProfile);
//List of all users
router.get("/users/:id?",userController.list);
//Register a new user
router.get("/register",userController.registerForm);
router.post("/register",[uploadFile.single("image")],validRegister,userController.register);
//Edit user
router.get("/userEdit/:id",userController.userEdit);
router.put("/userSave/:id",[uploadFile.single("image")],userController.userSave);
//Delete user
router.delete("/userDelete/:id",userController.userDelete)
//Admin Profile
router.get("/admin",userController.admin);

module.exports = router;