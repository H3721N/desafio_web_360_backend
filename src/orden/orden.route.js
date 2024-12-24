const router = require ('express').Router();

const { postOrden } = require('./orden.controller');

router.post('/orden', postOrden);

module.exports = router;