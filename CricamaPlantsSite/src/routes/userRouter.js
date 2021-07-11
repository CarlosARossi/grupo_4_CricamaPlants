let express = require('express')
let router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');
const multer = require ("multer")

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

//Routes
router.get("/login",userController.login);
router.get("/users/:id?",userController.list);

//Create user
router.get("/register",userController.registerForm);
router.post("/register",[upload.single("image")],userController.register);
router.get("/admin",userController.admin);

module.exports = router;