const router = require('express').Router();
const { postCategoriaProducto, updateCategoriaProducto, getCategoriaProducto, getCategoriaProductoWithPage } = require('./categoriaProducto.controller');
const { checkToken } = require('../middleware/checkToken');
const { checkRoleAuth } = require('../middleware/checkRoleAuth');
const {validateCategoria} = require("../validators/validators");

router.post(
    '/categoriaProducto',
    checkToken,
    validateCategoria,
    checkRoleAuth(['operador']),
    postCategoriaProducto
);

router.put('/categoriaProducto/:id',
    checkToken,
    validateCategoria,
    checkRoleAuth(['operador']),
    updateCategoriaProducto
);

router.get('/categoriaProducto', checkToken, getCategoriaProducto);

router.get('/categoriaProductoPage', checkToken, checkRoleAuth(['operador']), getCategoriaProductoWithPage);

module.exports = router;