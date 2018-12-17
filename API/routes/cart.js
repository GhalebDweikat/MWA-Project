const express = require('express');
const cartController = require('../controllers/cart');

const router = express.Router();

router.get('/', cartController.getCart);
router.post('/:productId', cartController.addProduct);
router.delete('/:productId', cartController.removeProduct);
router.put('/checkout', cartController.checkout);

module.exports = router;