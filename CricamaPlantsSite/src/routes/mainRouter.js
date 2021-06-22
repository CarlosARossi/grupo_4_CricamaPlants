let express = require('express')
let router = express.Router();
const mainController = require('../controllers/mainController');
const path = require('path');

//Routes
router.get("/",mainController.index);

module.exports = router;