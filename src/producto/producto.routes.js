const router = require('express').Router();
const { postProducto, updateProducto } = require('./producto.controller');

router.post('/producto', postProducto);

router.put('/producto/:idProductos', updateProducto);

module.exports = router;