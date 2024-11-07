// productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/product', productController.addProduct);
router.get('/products/:matricula', productController.getUserProducts); // Ruta correcta para obtener los productos

module.exports = router;
