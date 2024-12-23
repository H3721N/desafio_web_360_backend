const router = require('express').Router();
const { postProducto, updateProducto } = require('./producto.controller');
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

module.exports = router;