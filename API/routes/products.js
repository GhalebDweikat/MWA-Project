const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getAll);
router.post('/', productsController.create);
router.get('/:name', productsController.getByName);
router.put('/:productId', productsController.updateById);
router.delete('/:productId', productsController.deleteById);

module.exports = router;