const router = require('express').Router();
const { postProducto, updateProducto, getProducto, getProductoByPriceRange

} = require('./producto.controller');
const {checkToken} = require("../middleware/checkToken");
const {validateProducto} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");

router.post('/producto',
    checkToken,
    validateProducto,
    checkRoleAuth(['operador']),
    postProducto);

router.put('/producto/:id',
    checkToken,
    validateProducto,
    checkRoleAuth(['operador']),
    updateProducto);

router.get('/producto',
    checkToken,
    getProducto
);

module.exports = router;