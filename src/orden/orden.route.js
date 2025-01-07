const router = require ('express').Router();

const { postOrden, updateOrden, getOrden, getOrdenDetalleByOrdenId, cancelarOrden, entregarOrden} = require('./orden.controller');
const {checkToken} = require("../middleware/checkToken");
const {validateOrden} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");

router.post('/orden',
    checkToken,
    validateOrden,
    postOrden);

router.put('/orden/:id',
    checkToken,
    validateOrden,
    updateOrden);

router.get('/orden',
    checkToken,
    checkRoleAuth(['operador','cliente']),
    getOrden);

router.get('/orden/:id',
    checkToken,
    checkRoleAuth(['operador','cliente']),
    getOrdenDetalleByOrdenId);

router.put('/orden/cancelar/:id',
    checkToken,
    checkRoleAuth(['operador','cliente']),
    cancelarOrden);

router.put('/orden/entregar/:id',
    checkToken,
    checkRoleAuth(['operador','cliente']),
    entregarOrden);

module.exports = router;