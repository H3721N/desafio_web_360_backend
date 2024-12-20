const router = require('express').Router();
const { postCategoriaProducto, updateCategoriaProducto } = require('./categoriaProducto.controller');
const { checkToken } = require('../middleware/checkToken');
const { checkRoleAuth } = require('../middleware/checkRoleAuth');

router.post(
    '/categoriaProducto',
    checkToken,
    checkRoleAuth(),
    postCategoriaProducto
);

router.put('/categoriaProducto/:id', updateCategoriaProducto);

module.exports = router;