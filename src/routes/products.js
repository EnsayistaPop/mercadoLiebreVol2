// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//multer configuracion ******

let multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let carpetaAlmacenamiento = path.join(__dirname, '../../public/images/products');
        cb(null, carpetaAlmacenamiento);
    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});
const upload = multer({storage: multerDiskStorage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.single('image') , productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.post('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.post('/delete/:id', productsController.destroy); 


module.exports = router;
