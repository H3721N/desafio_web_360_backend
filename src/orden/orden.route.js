const router = require ('express').Router();

const { postOrden, updateOrden, getOrden} = require('./orden.controller');
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
    checkRoleAuth(['Admin','Usuario']),
    getOrden);

module.exports = router;