const router = require('express').Router();
const { postOrdenDetalle, putOrdenDetalle } = require('./ordenDetalle.controller');
const {validateOrdendetalles} = require("../validators/validators");
const {checkRoleAuth} = require("../middleware/checkRoleAuth");
const {checkToken} = require("../middleware/checkToken");

router.post('/ordenDetalle',
    checkToken,
    validateOrdendetalles,
    checkRoleAuth(['operador']),
    postOrdenDetalle);

router.put('/ordenDetalle/:id',
    checkToken,
    validateOrdendetalles,
    checkRoleAuth(['operador']),
    putOrdenDetalle);

module.exports = router;