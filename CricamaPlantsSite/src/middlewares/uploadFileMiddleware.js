const path = require('path');
const multer = require ('multer');

const dest = (folder)=>  multer.diskStorage({
    destination: (req, file, cb ) =>
        cb(null, path.resolve(__dirname,"../../public/uploads",folder)),
    filename: (req, file, cb) => 
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
})

/* const uploadFile = multer({storage:dest}); */

module.exports = dest;