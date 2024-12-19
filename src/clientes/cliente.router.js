const router = require('express').Router();
const { postCliente,
        updateCliente } = require('./cliente.controller');

router.post('/cliente', postCliente);

router.put('/cliente/:idcliente', updateCliente);

module.exports = router;
