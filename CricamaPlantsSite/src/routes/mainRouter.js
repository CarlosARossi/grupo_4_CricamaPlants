let express = require('express')
let router = express.Router();
const mainController = require('../controllers/mainController');
const path = require('path');

//Routes
router.get("/",mainController.list);
router.get("/contact",mainController.contact);

module.exports = router;