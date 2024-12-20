const router = require('express').Router();
const { postOrdenDetalle, putOrdenDetalle } = require('./ordenDetalle.controller');

router.post('/ordenDetalle', postOrdenDetalle);

router.put('/ordenDetalle/:id', putOrdenDetalle);

module.exports = router;