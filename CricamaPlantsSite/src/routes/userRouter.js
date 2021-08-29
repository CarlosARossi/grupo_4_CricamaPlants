//Requieres
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require ('multer');

//Middlewares
const validRegister = require("../middlewares/validRegisterMiddleware");
const uploadFile = require("../middlewares/uploadFileMiddleware");
const validLogin = require("../middlewares/validLoginMiddleware");
const validEditUser = require("../middlewares/validEditUserMiddleware");
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require("../middlewares/authMiddleware")
const upload = multer({storage:uploadFile('users')});


//Routes

//Login User
router.get("/login", guestMiddleware,userController.login);
router.post("/access",validLogin,userController.access);

//User Profile
router.get("/userProfile/:id", authMiddleware,userController.userProfile);

//List of all users
router.get("/users/:id?",userController.list);

//Register a new user
router.get("/register", guestMiddleware, userController.registerForm);
router.post("/register",[upload.single("image")],validRegister,userController.register);

//Edit user
router.get("/userEdit/:id",userController.userEdit);
router.put("/userSave/:id",[upload.single("image")],validEditUser,userController.userSave);

//Delete user
router.delete("/userDelete/:id",userController.userDelete)

//Admin Profile
router.get("/admin",userController.admin);

//Logout user
router.get("/logout", userController.logout)

module.exports = router;

