const router = require ('express').Router();

const { postOrden, updateOrden} = require('./orden.controller');
const {checkToken} = require("../middleware/checkToken");
const {validateOrden} = require("../validators/validators");

router.post('/orden',
    checkToken,
    validateOrden,
    postOrden);

router.put('/orden/:id',
    checkToken,
    validateOrden,
    updateOrden);

module.exports = router;