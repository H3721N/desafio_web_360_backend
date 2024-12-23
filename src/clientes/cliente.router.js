const router = require('express').Router();
const { postCliente,
        updateCliente } = require('./cliente.controller');
const {checkToken} = require("../middleware/checkToken");
const { validateClientes} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");

router.post('/cliente',
    checkToken,
    validateClientes,
    checkRoleAuth(['Admin']),
    postCliente);

router.put('/cliente/:id',
    checkToken,
    validateClientes,
    checkRoleAuth(['Admin']),
    updateCliente);

module.exports = router;
