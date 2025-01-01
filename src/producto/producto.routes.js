const router = require('express').Router();
const { postProducto, updateProducto, getProducto } = require('./producto.controller');
const {checkToken} = require("../middleware/checkToken");
const {validateProducto} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");

router.post('/producto',
    checkToken,
    validateProducto,
    checkRoleAuth(['Admin']),
    postProducto);

router.put('/producto/:id',
    checkToken,
    validateProducto,
    checkRoleAuth(['Admin']),
    updateProducto);

router.get('/producto',
    checkToken,
    getProducto
);

module.exports = router;