// productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/product', productController.addProduct);
router.get('/products/:matricula', productController.getProductsByUser);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
