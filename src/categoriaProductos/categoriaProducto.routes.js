const router = require('express').Router();
const { postCategoriaProducto, updateCategoriaProducto } = require('./categoriaProducto.controller');
const { checkToken } = require('../middleware/checkToken');
const { checkRoleAuth } = require('../middleware/checkRoleAuth');
const {validateCategoria} = require("../validators/validators");

router.post(
    '/categoriaProducto',
    checkToken,
    validateCategoria,
    checkRoleAuth(['Admin']),
    postCategoriaProducto
);

router.put('/categoriaProducto/:id',
    checkToken,
    validateCategoria,
    checkRoleAuth(['Admin']),
    updateCategoriaProducto
);

module.exports = router;