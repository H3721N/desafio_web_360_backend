const router = require('express').Router();
const { postOrdenDetalle, putOrdenDetalle } = require('./ordenDetalle.controller');

router.post('/ordenDetalle', postOrdenDetalle);

router.put('/ordenDetalle/:idOrdenDetalles', putOrdenDetalle);

module.exports = router;