const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getAdminProducts);
router.post('/add-product', adminController.postAddProduct);
router.post('/products', adminController.postDeleteProduct);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product/:productId', adminController.postEditProduct);

module.exports = router;