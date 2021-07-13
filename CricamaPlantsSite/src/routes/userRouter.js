//Requieres
let express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');
const multer = require ('multer');
const { body } = require ('express-validator');

//Route for images
let dest = multer.diskStorage({
    destination: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        if(extension.indexOf("jpg") > 0){
            cb(null, path.resolve(__dirname,"../../public/uploads","users"))
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
})
const upload = multer({storage:dest});

const validations = [
    body('firstName').notEmpty().withMessage('Tenes que escribir tu nombre'),
    body('lastName').notEmpty().withMessage('Tenes que escribir tu apellido'),
    body('email')
        .notEmpty().withMessage('Tenes que escribir tu email').bail()
        .isEmail().withMessage('Formato de mail inválido'),
    body('password').notEmpty().withMessage('Tenes que escribir una contraseña'),
]

//Routes
//Login User
router.get("/login",userController.login);
//User Profile
router.get("/userProfile/:id",userController.userProfile);
//List of all users
router.get("/users/:id?",userController.list);
//Register a new user
router.get("/register",userController.registerForm);
router.post("/register",[upload.single("image")],validations,userController.register);
//Edit user
router.get("/userEdit/:id",userController.userEdit);
router.put("/userSave/:id",[upload.single("image")],userController.userSave);
//Delete user
router.delete("/userDelete/:id",userController.userDelete)
//Admin Profile
router.get("/admin",userController.admin);

module.exports = router;