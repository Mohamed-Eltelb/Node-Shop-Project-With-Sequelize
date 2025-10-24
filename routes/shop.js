const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const cartController = require('../controllers/cart');

router.get('/', productsController.getIndex);
router.get('/products', productsController.getProducts);
router.get('/products/:productId', productsController.getProduct);
router.get('/cart', cartController.getCart);
router.post('/add-to-cart', cartController.postAddToCart);
router.post('/update-quantity', cartController.updateQuantityInCart);
router.post('/remove-from-cart', cartController.postRemoveFromCart);
router.get('/checkout', productsController.getCheckout);

module.exports = router;