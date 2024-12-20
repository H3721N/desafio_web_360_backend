const router = require('express').Router();
const { postCategoriaProducto, updateCategoriaProducto } = require('./categoriaProducto.controller');

router.post('/categoriaProducto', postCategoriaProducto);

router.put('/categoriaProducto/:id', updateCategoriaProducto);

module.exports = router;