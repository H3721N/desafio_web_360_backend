const router = require('express').Router();
const { postCliente,
        updateCliente,
        postClienteUsuario} = require('./cliente.controller');
const {checkToken} = require("../middleware/checkToken");
const { validateClientes} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");

router.post('/cliente',
    checkToken,
    validateClientes,
    checkRoleAuth(['operador']),
    postCliente);

router.put('/cliente/:id',
    checkToken,
    validateClientes,
    checkRoleAuth(['operador']),
    updateCliente);

router.post('/clienteUsuario',
    postClienteUsuario);

module.exports = router;
