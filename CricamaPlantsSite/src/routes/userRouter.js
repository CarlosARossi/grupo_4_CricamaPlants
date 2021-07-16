//Requieres
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require ('multer');

//Middlewares
const validRegister = require("../middlewares/validRegisterMiddleware");
const uploadFile = require("../middlewares/uploadFileMiddleware");
const validLogin = require("../middlewares/validLoginMiddleware");
const upload = multer({storage:uploadFile('users')});

//Routes

//Login User
router.get("/login",userController.login);
router.post("/access",validLogin,userController.access);

//User Profile
router.get("/userProfile/:id",userController.userProfile);

//List of all users
router.get("/users/:id?",userController.list);

//Register a new user
router.get("/register",userController.registerForm);
router.post("/register",[upload.single("image")],validRegister,userController.register);

//Edit user
router.get("/userEdit/:id",userController.userEdit);
router.put("/userSave/:id",[upload.single("image")],userController.userSave);

//Delete user
router.delete("/userDelete/:id",userController.userDelete)

//Admin Profile
router.get("/admin",userController.admin);

module.exports = router;
